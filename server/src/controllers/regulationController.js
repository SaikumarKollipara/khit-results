import excelToJson from "convert-excel-to-json";

import { getAbsolutePath } from "../utils/features.js";

export function uploadRegulation (req, res, next) {
  try {
    let data = excelToJson({ 
      sourceFile: getAbsolutePath(import.meta.url, '../uploads/data.xlsx'),
    })
    let result = []
    for ( const key of Object.keys(data)) {
      const table = data[key]
      if (table.length > 1) {
        result.push(table.slice(1));
      }
    }
    const branch = {
      name: 'ece',
      sems: {
        1: {
          subjects: [],
          totalCredits: 0
        },
        2: {
          subjects: [],
          totalCredits: 0
        },
        3: {
          subjects: [],
          totalCredits: 0
        },
        4: {
          subjects: [],
          totalCredits: 0
        },
        5: {
          subjects: [],
          totalCredits: 0
        },
        6: {
          subjects: [],
          totalCredits: 0
        },
        7: {
          subjects: [],
          totalCredits: 0
        },
        8: {
          subjects: [],
          totalCredits: 0
        },
      }
    }
    let count = 1;
    for (const sem of result) {
      for (const result of sem.slice(0, sem.length-1)) {
        branch.sems[count].subjects.push(result);
      }
      branch.sems[count].totalCredits = sem.at(-1)['G'];
      count += 1;
    }
    
    return res.send(branch);
  } catch (err) {
    next(err);
  }
}