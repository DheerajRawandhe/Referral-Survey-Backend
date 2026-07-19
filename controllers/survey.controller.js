
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
      ...answers  
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

    let referrer = null;

    
    if (referralCode) {
      referrer = await User.findOne({ referralCode });

      if (!referrer) {
        return res.status(400).json({
          success: false,
          message: "Invalid referral code",
        });
      }

      
      if (referrer.email === email || referrer.phone === phone) {
        return res.status(400).json({
          success: false,
          message: "Self-referral is not allowed",
        });
      }
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
      answers,   
    });

    
    if (referrer) {
      referrer.referralCount += 1;

      if (referrer.referralCount >= 3) {
        referrer.rewardStatus = "UNLOCKED";
      }

      await referrer.save();
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