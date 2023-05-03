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


export async function createStudent (rollNo, examType, sem, availableRegulations, examDate, resultsData) {
  const { regulation, branch } = findRegulationAndBranch(rollNo, availableRegulations, resultsData[0].subCode);
  if (examType === 'regular and supply') {
    examType = findExamType(regulation, availableRegulations);
  }
  const newStudent = new Student({ rollNo, regulation, branch });
  await saveStudent(newStudent, examType, sem, examDate, resultsData);
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
  await student.save();
  // updateFinalResult();

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


export async function updateStudent (student, examType, sem, availableRegulations, examDate, resultsData) {
  try {
    if (examType === 'regular and supply') {
      examType = findExamType(student.regulation, availableRegulations);
    }
    saveStudent(student, examType, sem, examDate, resultsData);
  } catch (err) {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    throw err;
  }
}