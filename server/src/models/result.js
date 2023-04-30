import mongoose from "mongoose";

export const resultSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    match: /^\d{3}\w\d\w\d{4}$/
  },
  subCode: {
    type: String,
    required: true,
    match: /^R\d{6}$/
  },
  subName: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true,
    enum: ['o', 's', 'a', 'b', 'c', 'd', 'e', 'f', 'absent']
  },
  credits: {
    type: Number,
    required: true
  }
});

const Result = mongoose.model('Result', resultSchema);
export default Result;