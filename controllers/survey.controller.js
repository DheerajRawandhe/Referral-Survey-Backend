import User from "../models/User.js";
import generateReferralCode from "../utils/generateReferralCode.js";

export const submitSurvey = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      college,
      yearOfStudy,
      branch,
      referralCode,
    } = req.body;
  
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const existingPhone = await User.findOne({ phone });

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone already registered",
      });
    }

    const myReferralCode = await generateReferralCode();

    const user = await User.create({
      name,
      email,
      phone,
      college,
      yearOfStudy,
      branch,
      referralCode: myReferralCode,
    });

    if (referralCode) {
      const referrer = await User.findOne({
        referralCode,
      });

      if (referrer) {
        referrer.referralCount += 1;

        if (referrer.referralCount >= 3) {
          referrer.rewardStatus = "UNLOCKED";
        }

        await referrer.save();
      }
    }

    res.status(201).json({
      success: true,
      message: "Survey submitted successfully",
      referralCode: myReferralCode,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};