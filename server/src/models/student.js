import mongoose from "mongoose";



const resultSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    match: /^\d{2}8x(1|5)(a|d|e|f|r|s|t)\d{2}[a-z0-9]{2}$/
  },
  subCode: {
    type: String,
    required: true
  },
  subName: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true,
    // enum: ['o', 's', 'a+', 'a', 'b', 'c', 'd', 'e', 'f', 'absent', 'completed', 'no change']
  },
  credits: {
    type: mongoose.Schema.Types.Mixed,
    validate: {
      validator: function(value) {
        return typeof value === 'number' || value === 'no change';
      },
      message: 'myField must be a number or "no change"'
    }
  }
});

export const examSchema = new mongoose.Schema({
  examDate: {
    type: Date,
    required: true
  },
  results: [resultSchema]
}, { timestamps: true });


const semSchema = new mongoose.Schema({
  regular: examSchema,
  supply: [examSchema],
  revaluation: [examSchema],
  final: {
    results: [resultSchema],
    sgpa: Number,
    backlogs: [{ subCode: String, subName: String }]
  }
});

const studentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    match: /^\d{2}8x(1|5)(a|d|e|f|r|s|t)\d{2}[a-z0-9]{2}$/
  },
  regulation: {
    type: String,
    // required: true
  },
  branch: {
    type: String,
    // required: true
  },
  sems: {
    1: { type: semSchema, default: { regular: null, supply: [], revaluation: [] } },
    2: { type: semSchema, default: { regular: null, supply: [], revaluation: [] } },
    3: { type: semSchema, default: { regular: null, supply: [], revaluation: [] } },
    4: { type: semSchema, default: { regular: null, supply: [], revaluation: [] } },
    5: { type: semSchema, default: { regular: null, supply: [], revaluation: [] } },
    6: { type: semSchema, default: { regular: null, supply: [], revaluation: [] } },
    7: { type: semSchema, default: { regular: null, supply: [], revaluation: [] } },
    8: { type: semSchema, default: { regular: null, supply: [], revaluation: [] } },
  },
  finalResult: {
    cgpa: Number,
    backlogs: [{ subCode: String, subName: String }]
  }
});

const Student = mongoose.model('Student', studentSchema);
export default Student;