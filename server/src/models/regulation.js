import mongoose from 'mongoose';

const regulationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
  }
});

const semSchema = new mongoose.Schema({
  regular: [examSchema],
  supply: [examSchema],
  revaluation: [examSchema],
});

export const examSchema = new mongoose.Schema({
  examData: Date,
  results: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Result,
    required: true
  }]
});

const Regulation = mongoose.model('Regulation', regulationSchema);
export default Regulation;