export function getCompletedSemesters(student) {
  const semesters = student.sems;
  const completedSemesters = []
  for (const semNumber in semesters) {
    const semester = semesters[semNumber];
    const isCompleted = semester.regular;
    if (isCompleted) {
      const completedSemester = { 
        ...semester.final, 
        number: getFormattedSemNumber(semNumber), 
        percentage: getPercetage(semester.final.sgpa).toFixed(2),
        sgpa: semester.final.sgpa.toFixed(2) 
      }
      completedSemesters.push(completedSemester);
    }
  }
  return completedSemesters;
}

function getFormattedSemNumber(semNumber) {
  const year = Math.ceil(semNumber / 2);
  const sem = (semNumber % 2) ? 1 : 2;
  return year + '-' + sem;
}

function getPercetage(gpa) {
  return (gpa * 10) - 7.5;
}