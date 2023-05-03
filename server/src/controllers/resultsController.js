import fs from 'fs';

import Student from '../models/student.js';
import { createStudent, processAndGetJSON, updateStudent } from '../services/resultsService.js';
import { getAbsolutePath } from '../utils/features.js';

export async function uploadResults (req, res, next) {
  try {
    // let { examType, sem, availableRegulations, examDate } = req.body; ///////////regular, supply, regular and supply, revaluation
    let examType = 'regular and supply', sem = '1', availableRegulations = ['r19', 'r16'], examDate = new Date(2, 2022);
    //Process the input data
    availableRegulations = availableRegulations.map( regulation => regulation.toLowerCase() ).sort();

    const uploadedFilePath = getAbsolutePath(import.meta.url, '../uploads/results.xlsx');
    const resultsData = processAndGetJSON(uploadedFilePath); ///////////validation for resultsData required
    for (const rollNo in resultsData) {
      const existedStudent = await Student.findOne({ rollNo });
      if (!existedStudent) {
        await createStudent(rollNo, examType, sem, availableRegulations, examDate, resultsData[rollNo]);
      } else {
        await updateStudent(existedStudent, examType, sem, availableRegulations, examDate, resultsData[rollNo]);
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