export function getSemestersData(student) {
  const semesters = []
  for (const semNumber in student.sems) {
    const semester = student.sems[semNumber];
    const isCompleted = semester.regular;
    if (isCompleted) {
      const completedSemester = { 
        ...semester.final,
        isCompleted,
        number: formatSemNumber(semNumber), 
        percentage: getPercentage(semester.final.sgpa).toFixed(2),
        sgpa: semester.final.sgpa.toFixed(2) 
      }
      semesters.push(completedSemester);
    } else {
      const unCompletedSemester = { isCompleted, number: formatSemNumber(semNumber) };
      semesters.push(unCompletedSemester);
    }
  }
  return semesters;
}

function formatSemNumber(semNumber) {
  const year = Math.ceil(semNumber / 2);
  const sem = (semNumber % 2) ? 1 : 2;
  return year + '-' + sem;
}

export function deFormatSemNumber(number) {
  const SEM_NUMBER_MAP = {
    '1-1': '1',
    '1-2': '2',
    '2-1': '3',
    '2-2': '4',
    '3-1': '5',
    '3-2': '6',
    '4-1': '7',
    '4-2': '8'
  }
  return SEM_NUMBER_MAP[number]
}


export function getPercentage(gpa) {
  return (gpa * 10) - 7.5;
}