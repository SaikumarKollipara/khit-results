import mongoose from "mongoose";

import { examSchema } from './exam.js';
import { resultSchema } from "./result.js";

const studentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true
  },
  regulation: {
    type: String,
    required: true,
    match: /^R\d{2}/
  },
  sems: {
    1: semSchema,
    2: semSchema,
    3: semSchema,
    4: semSchema,
    5: semSchema,
    6: semSchema,
    7: semSchema,
    8: semSchema,
  },
  finalResult: {
    cgpa: Number,
    backlogs: [String]
  }
});

const semSchema = new mongoose.Schema({
  regular: examSchema,
  supply: [examSchema],
  revaluation: [examSchema],
  final: {
    results: [resultSchema],
    sgpa: Number,
    backlogs: [String]
  }
});

const Student = mongoose.model('Student', studentSchema);
export default Student;