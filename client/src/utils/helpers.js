export function getSemestersData(student) {
  const semesters = []
  for (const semNumber in student.sems) {
    const semester = student.sems[semNumber];
    const isCompleted = semester.regular;
    if (isCompleted) {
      const completedSemester = { 
        ...semester.final,
        isCompleted,
        number: getFormattedSemNumber(semNumber), 
        percentage: getPercentage(semester.final.sgpa).toFixed(2),
        sgpa: semester.final.sgpa.toFixed(2) 
      }
      semesters.push(completedSemester);
    } else {
      const unCompletedSemester = { isCompleted, number: getFormattedSemNumber(semNumber) };
      semesters.push(unCompletedSemester);
    }
  }
  return semesters;
}

function getFormattedSemNumber(semNumber) {
  const year = Math.ceil(semNumber / 2);
  const sem = (semNumber % 2) ? 1 : 2;
  return year + '-' + sem;
}

export function getPercentage(gpa) {
  return (gpa * 10) - 7.5;
}