import mongoose from 'mongoose';

export const examSchema = new mongoose.Schema({
  examData: Date,
  results: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result',
    required: true
  }]
}, { timestamps: true });

const Exam = mongoose.model('Exam', examSchema);
export default Exam;