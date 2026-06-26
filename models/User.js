import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },  
  
    phone: {
      type: String,
      required: true,
      unique: true,
    },

    college: {
      type: String,
      required: true,
    },
  
    yearOfStudy: {
      type: String,
    },

    branch: {
      type: String,
    },

    referralCode: {
      type: String,
      unique: true,
    },

    referralCount: {
      type: Number,
      default: 0,
    },

    rewardStatus: {
      type: String,
      enum: ["PENDING", "UNLOCKED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);