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
  regular: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam'
  }],
  supply: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam'
  }],
  revaluation: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam'
  }],
});


const Regulation = mongoose.model('Regulation', regulationSchema);
export default Regulation;