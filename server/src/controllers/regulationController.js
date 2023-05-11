import excelToJson from "convert-excel-to-json";

import { getAbsolutePath } from "../utils/features.js";
import Regulation from "../models/regulation.js";

export async function uploadRegulation (req, res, next) {

  try {
    const regulation = {
      name: 'r16',
      branches: [
        {
          name: 'cse',
          code: '05',
          sems: {
            1: { totalCredits: 19 },
            2: { totalCredits: 21 },
            3: { totalCredits: 22 },
            4: { totalCredits: 21 },
            5: { totalCredits: 19 },
            6: { totalCredits: 21 },
            7: { totalCredits: 21 },
            8: { totalCredits: 16 },
          }
        },
        {
          name: 'ece',
          code: '04',
          sems: {
            1: { totalCredits: 19 },
            2: { totalCredits: 21 },
            3: { totalCredits: 21 },
            4: { totalCredits: 21 },
            5: { totalCredits: 21 },
            6: { totalCredits: 21 },
            7: { totalCredits: 21 },
            8: { totalCredits: 15 },
          }
        },
        {
          name: 'it',
          code: '12',
          sems: {
            1: { totalCredits: 19 },
            2: { totalCredits: 21 },
            3: { totalCredits: 21 },
            4: { totalCredits: 20 },
            5: { totalCredits: 22 },
            6: { totalCredits: 19 },
            7: { totalCredits: 22 },
            8: { totalCredits: 16 },
          }
        },
        {
          name: 'eee',
          code: '02',
          sems: {
            1: { totalCredits: 19 },
            2: { totalCredits: 21 },
            3: { totalCredits: 21 },
            4: { totalCredits: 21 },
            5: { totalCredits: 20 },
            6: { totalCredits: 21 },
            7: { totalCredits: 20 },
            8: { totalCredits: 17 },
          }
        },
        {
          name: 'mech',
          code: '03',
          sems: {
            1: { totalCredits: 19 },
            2: { totalCredits: 21 },
            3: { totalCredits: 21 },
            4: { totalCredits: 21 },
            5: { totalCredits: 20 },
            6: { totalCredits: 20 },
            7: { totalCredits: 18 },
            8: { totalCredits: 20 },
          }
        },
        {
          name: 'civil',
          code: '01',
          sems: {
            1: { totalCredits: 19.5 },
            2: { totalCredits: 20.5 },
            3: { totalCredits: 21 },
            4: { totalCredits: 19 },
            5: { totalCredits: 20 },
            6: { totalCredits: 22 },
            7: { totalCredits: 21 },
            8: { totalCredits: 17 },
          }
        }
      ],
      gradePoints: [
        { grade: 'o', value: 10 },
        { grade: 's', value: 9 },
        { grade: 'a', value: 8 },
        { grade: 'b', value: 7 },
        { grade: 'c', value: 6 },
        { grade: 'd', value: 5 },
        { grade: 'f', value: 0 },
        { grade: 'absent', value: 0 },
        { grade: 'completed', value: 1 }
      ]
    }
    await Regulation.create(regulation);
    return res.status(201).json({ success: true, message: 'Regulation created successfully' });
  } catch (err) {
    next(err);
  }
}