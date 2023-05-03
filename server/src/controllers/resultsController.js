import fs from 'fs';

import Student from '../models/student.js';
import { createStudent, processAndGetJSON, updateStudent } from '../services/resultsService.js';
import { getAbsolutePath } from '../utils/features.js';

export async function uploadResults (req, res, next) {
  try {
    // let { examType, sem, availableRegulations, examDate } = req.body; ///////////regular, supply, regular and supply, revaluation
    let examType = 'regular', sem = '1', availableRegulations = ['r19', 'r16'], examDate = new Date(2, 2022);
    //Process the input data
    availableRegulations = availableRegulations.map( regulation => regulation.toLowerCase() ).sort();

    const uploadedFilePath = getAbsolutePath(import.meta.url, '../uploads/results.xlsx');
    const resultsData = processAndGetJSON(uploadedFilePath); ///////////validation for resultsData required
    // const resultsData = { //For testing
    //   "168x1a0102":  [
    //     {
    //         "rollNo": "168x1a0102",
    //         "subCode": "r161232",
    //         "subName": "elements of mechanical engineering",
    //         "grade": "s",
    //         "credits": 2 
    //     }
    //   ]
    // }
    for (const rollNo in resultsData) {
      const existedStudent = await Student.findOne({ rollNo });
      let student = null;
      if (!existedStudent) {
        student = await createStudent(rollNo, examType, sem, availableRegulations, examDate, resultsData[rollNo]);
      } else {
        student = await updateStudent(existedStudent, examType, sem, availableRegulations, examDate, resultsData[rollNo]);
      }
    }
    
    return res.status(200).json({ success: true, message: 'Results uploaded successfully' });

    // Delete uploaded file
    fs.unlink(uploadedFilePath, (err) => {
      if (err) throw err;
    })
  } catch (err) {
    next(err);
  }
}

export async function getResults(req, res, next) {
  try {
    const rollNo = req.params.rollNo;
    const student = await Student.findOne({ rollNo });
    if(!student) return res.status(400).json({ success: false, message: 'Invalid Roll No' });
    return res.status(200).json({ success: true, student });
  } catch (err) {
    next(err);
  }
}