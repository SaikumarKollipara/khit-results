import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  examDate: {
    type: Date,
    required: true
  },
  results: [resultSchema]
}, { timestamps: true });

const Exam = mongoose.model('Exam', examSchema);
export default Exam;