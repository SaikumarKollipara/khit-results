import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  code: {
    type: String,
    // required: true
  },
  name: {
    type: String,
    // required: true
  },
  credits: {
    type: Number,
    // required: true
  }
}); 

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sems: {
    1: { subjects: [subjectSchema], totalCredits: { type: Number, require: true }},
    2: { subjects: [subjectSchema], totalCredits: { type: Number, require: true }},
    3: { subjects: [subjectSchema], totalCredits: { type: Number, require: true }},
    4: { subjects: [subjectSchema], totalCredits: { type: Number, require: true }},
    5: { subjects: [subjectSchema], totalCredits: { type: Number, require: true }},
    6: { subjects: [subjectSchema], totalCredits: { type: Number, require: true }},
    7: { subjects: [subjectSchema], totalCredits: { type: Number, require: true }},
    8: { subjects: [subjectSchema], totalCredits: { type: Number, require: true }},
  }
})

const regulationSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  branches: [branchSchema],
  gradePoints: [{
    grade: {type: String, maxlength: 1, required: true},
    value: {type: Number, required: true}
  }]
});

const Regulation = mongoose.model('Regulation', regulationSchema);
export default Regulation;