

// models/SurveyResponse.js
import mongoose from "mongoose";

const surveyResponseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // agar personal info se link karna hai
  name: String,
  email: String,
  phone: String,
  college: String,
  yearOfStudy: String,
  branch: String,
  referralCodeUsed: String,

  
 answers: {
  q6_primaryGoal: String,
  q7_restartCount: String,
  q8_answer: String,
  q9_answer: String,
  q10_answer: String,
  q11_answer: String,
  q12_answer: String,
  q13_answer: String,
  q14_answer: String,
  q15_answer: String,
  q16_answer: [String],   // multi-select 
  q17_answer: String,
  q18_answer: String,
  q19_answer: [String],   // multi-select
  q20_answer: String,
  q21_answer: String,
  q22_answer: String,
  q23_answer: String,
  q24_answer: String,
  q25_answer: String,
  q26_answer: String,
},

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("SurveyResponse", surveyResponseSchema);

