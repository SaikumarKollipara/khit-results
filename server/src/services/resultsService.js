import excelToJson from 'convert-excel-to-json';
import Student from '../models/student.js';


export function processAndGetJSON (path) {
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
  const { regulation, branch } = findRegulationAndBranch(rollNo, availableRegulations, resultsData[0].subCode);
  if (examType === 'regular and supply') {
    examType = findExamType(regulation, availableRegulations);
  }
  let newStudent = new Student({ rollNo, regulation, branch });
  newStudent = await saveStudent(newStudent, examType, sem, examDate, resultsData);
  return newStudent;
}

async function saveStudent (student, examType, sem, examDate, resultsData) {
  const exam = {
    examDate,
    results: resultsData
  }
  if (examType === 'regular') {
    student.sems[sem].regular = exam;
  } else if (examType === 'supply') {
    student.sems[sem].supply.push(exam);
  } else if (examType === 'revaluation') {
    student.sems[sem].revaluation.push(exam);
  }

  // Update regular results with supply and revaluation
  if (student.sems[sem].regular) {
    const regularResults = student.sems[sem].regular.results;
    const supplyExams = [...student.sems[sem].supply, ...student.sems[sem].revaluation];
    let finalResults = student.sems[sem].final.results;
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
    const backlogs = []
    finalResults.forEach( result => {
      if (result.credits === 0 && result.grade !== 'completed') {
        backlogs.push({ subCode: result.subCode, subName: result.subName });
      }
    })
    student.sems[sem].final.results = finalResults;
    student.sems[sem].final.backlogs = backlogs;
  }
  student = await student.save();
  return student; 
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

function findRegulationAndBranch (rollNo, availableRegulations, subCode) {
  const admissionYear = rollNo.slice(0, 2);
  let regulation = '', branch = '';
  for (const reg of [...availableRegulations].reverse()) {
    if (('r'+admissionYear) >= reg) {
      regulation = reg;
      break;
    }
  }
  return { regulation, branch };
}

function findExamType (regulation, availableRegulations) {
  if (availableRegulations.at(-1) === regulation) return 'regular';
  return 'supply';
}


