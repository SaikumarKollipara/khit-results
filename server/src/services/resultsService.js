import excelToJson from 'convert-excel-to-json';

import Student from '../models/student.js';
import Regulation from '../models/regulation.js';
import { AppError } from '../middlewares/errorMiddleware.js';


// ----------------------------------------------uploadResults---------------------------------------------------------------- 
export function processAndGetJSON(path) {
  if (Object.keys(excelToJson({ sourceFile: path })['Table 1'][0]).length !== 5) 
    throw new AppError('The columns should be in the format of RollNo, SubCode, SubName, Grade, Credits', 400)
  let data = excelToJson({ 
    sourceFile: path,
    columnToKey: {
      A: 'rollNo',
      B: 'subCode',
      C: 'subName',
      D: 'grade',
      E: 'credits', 
    }
  })
  data = data['Table 1'].filter( result => Object.keys(result).length === 5 ).slice(1);
  data = data.map( result => {
    const newResult = {};
    for (const key in result) {
      if(result.hasOwnProperty(key) && typeof result[key] === 'string') {
        newResult[key] = result[key].toLowerCase();
      } else {
        newResult[key] = result[key];
      }
    }
    return newResult;
  })
  const groupedByRollNo = data.reduce(( groups, result ) => {
    if (!groups[result['rollNo']]) groups[result['rollNo']] = [];
    groups[result['rollNo']].push(result);
    return groups;
  }, {});
  return groupedByRollNo;
}

export async function updateStudent (student, examType, sem, availableRegulations, examDate, resultsData) {
  if (examType === 'regular and supply') {
    examType = findExamType(student.regulation, availableRegulations);
  }
  const updatedStudent = await saveStudent(student, examType, sem, examDate, resultsData);
  return updatedStudent;
}


export async function createStudent (rollNo, examType, sem, availableRegulations, examDate, resultsData) {
  const { regulation, branch } = await findRegulationAndBranch(rollNo, availableRegulations, resultsData[0].subCode);
  if (examType === 'regular and supply') {
    examType = findExamType(regulation, availableRegulations);
  }
  let newStudent = await Student.create({ rollNo, regulation, branch });
  newStudent = await saveStudent(newStudent, examType, sem, examDate, resultsData);
  return newStudent;
}

async function saveStudent(student, examType, sem, examDate, resultsData) {

  const exam = {
    examDate: new Date(examDate),
    results: resultsData
  }
  if (isAlreadyExisted(exam, student.sems[sem])) throw new AppError('This data already exists in the database');
  if (examType === 'regular') {
    student.sems[sem].regular = exam;
  } else if (examType === 'supply') {
    student.sems[sem].supply.push(exam);
  } else if (examType === 'revaluation') {
    student.sems[sem].revaluation.push(exam);
  }
  // Update regular results with supply and revaluation and save it in final
  if (student.sems[sem].regular) {
    const regularResults = student.sems[sem].regular.results;
    const supplyExams = [...student.sems[sem].supply, ...student.sems[sem].revaluation];
    let finalResults = student.sems[sem].final.results;
    const backlogs = []

    if (finalResults.length === 0) {
      //First time creating final results
      finalResults = regularResults;
      for (const exam of supplyExams) {
        finalResults = getCombinedResults(finalResults, exam.results);
      }
    } else {
      //Already having final results
      finalResults = student.sems[sem].final.results;
      finalResults = getCombinedResults(finalResults, exam.results);
    }
    finalResults.forEach( result => {
      if (result.credits === 0 && result.grade !== 'completed') {
        backlogs.push({ subCode: result.subCode, subName: result.subName });
      }
    })
    student.sems[sem].final.results = finalResults;
    student.sems[sem].final.backlogs = backlogs;
    student.sems[sem].final.sgpa = await calculateSGPA(student, sem);
  }
  
  await student.save();
  return student; 
}



async function calculateSGPA(student, semNumber) {
  const havingBacklogs = student.sems[semNumber].final.backlogs.length !== 0;
  const regulationData = await Regulation.findOne({ name: student.regulation });
    const GRADE_POINTS_MAP = {};
  const sem = regulationData.branches.find( branch => branch.name === student.branch ).sems[semNumber];
  let SGPA = 0, sumOfGxC = 0, totalCredits = 0;

  regulationData.gradePoints.forEach( gradePoint => {
    GRADE_POINTS_MAP[gradePoint.grade] = gradePoint.value;
  })

  // If subject credits uploaded take credits from that, else from results data
  if (sem.subjects[0]) {
    totalCredits = sem.subjects.reduce( (sumOfCredits, subject) => sumOfCredits + subject.credits, 0);
  } else {
    totalCredits = sem.totalCredits;
  }

  // Code to avoid conflict of showing different totalcredits in syllabus sheet and resutls
  // The below code will take the totalCredits from student results and update the db
  // if(havingBacklogs) {
  //   // Get credits from Regulation Model
  //   totalCredits = sem.totalCredits;
  // } else {
  //   // Get credits from student itself
  //   totalCredits = student.sems[semNumber].final.results.reduce( (sumOfCredits, result) => sumOfCredits + result.credits, 0 );
  //   // Update DB with credits
  //   const regulation = student.regulation;
  //   const branchName = student.branch;
  //   const newTotalCredits = totalCredits;
  //   await Regulation.findOneAndUpdate(
  //     { name: regulation },
  //     { $set: { [`branches.$[branch].sems.${semNumber}.totalCredits`]: newTotalCredits } },
  //     { arrayFilters: [{ 'branch.name': branchName }] }
  //   )
  // }
  student.sems[semNumber].final.results.forEach( result => {
    sumOfGxC += GRADE_POINTS_MAP[result.grade] * result.credits
    console.log(result.grade)
  })
  SGPA = sumOfGxC / totalCredits;
  return SGPA;
}

function isAlreadyExisted(newExam, sem) {
  const existedExams = [];
  existedExams.push(sem.regular);
  existedExams.push([...sem.supply]);
  existedExams.push([...sem.revaluation]);
  for (const existedExam of existedExams) {
    if (existedExam?.examDate === newExam.examDate) return true;
  }
  return false;
}

export async function calculateFinalResult(student) {
  let backlogs = [];
  const sems = student.sems;
  for (let sem=1; sem <= 8; sem++) {
    backlogs = [...backlogs, ...sems[sem].final.backlogs];
  }
  student.finalResult.cgpa = await calculateCGPA(student);
  student.finalResult.backlogs = backlogs;
  await student.save();
}



async function calculateCGPA(student) {
  const regulation = await Regulation.findOne({ name: student.regulation });
  let CGPA = 0, sumOfSGPAxC = 0, totalCreditsOfAllSems = 0;
  const totalCredits = regulation.branches.find( branch => branch.name === student.branch ).sems;

  const SGPAOfSem = student.sems;
  for (let sem=1; sem<=8; sem++) {
    const SGPA = SGPAOfSem[sem].final.sgpa;
    if (SGPA){
      sumOfSGPAxC += (SGPA) * totalCredits[sem].totalCredits;
      totalCreditsOfAllSems += totalCredits[sem].totalCredits;
    }
  }
  CGPA = sumOfSGPAxC / totalCreditsOfAllSems;
  if (CGPA) return CGPA;
}


function getCombinedResults(actualResults, newResults) {
  ////////////////////////need optimization
  for (const newResult of newResults) {
    for (const actualResult of actualResults) {
      if (newResult.subCode === actualResult.subCode) {
        if (newResults.credits !== 'no change' && newResult.credits > actualResult.credits) {
          actualResult.grade = newResult.grade;
          actualResult.credits = newResult.credits;
        }
        break;
      }
    }
  }
  return actualResults;
  
  // const updatedResults = actualResults.map( actualResult => {
  //   const newResult = newResults.find( result => 
  //     result.subCode === actualResult.subCode &&
  //     result.grade !== actualResult.grade
  //   );
  //   if (newResult) {
  //     const updatedResult = {...actualResult, grade: newResult.grade, credits: newResult.credits};
  //     return updatedResult;
  //   }
  //   return actualResult;
  // })
  // return updatedResults;

}

async function findRegulationAndBranch (rollNo, availableRegulations) {
  // const BRANCH_MAP = {
  //   '01': 'civil',
  //   '02': 'eee',
  //   '03': 'mech',
  //   '04': 'ece',
  //   '12': 'it',
  //   '05': 'cse',
  //   '42': 'ai&ml',
  //   '43': 'ai',
  //   '44': 'ds',
  //   '45': 'ai&ds',
  // };
  const admissionYear = rollNo.slice(0, 2);
  let regulation = '';
  for (const reg of [...availableRegulations].reverse()) {
    if (('r'+admissionYear) >= reg) {
      regulation = reg;
      break;
    }
  }
  const regulationData = await Regulation.findOne({ name: regulation });
  const branch_map = {};
  regulationData.branches.forEach( branch => branch_map[branch.code] = branch.name )
  const branch = branch_map[rollNo.slice(6, 8)];
  return { regulation, branch };
}

function findExamType (regulation, availableRegulations) {
  if (availableRegulations[availableRegulations.length-1] === regulation) return 'regular';
  return 'supply';
}

// ----------------------------------------------uploadResults---------------------------------------------------------------- 