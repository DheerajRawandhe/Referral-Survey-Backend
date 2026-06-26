import mongoose from "mongoose";

const surveyResponseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    answers: [
      {
        questionNumber: Number,
        question: String,
        answer: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "SurveyResponse",
  surveyResponseSchema
);