const User = require("../models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sentToken } = require("../utils/sentMail");
const { log } = require("console");

const signupUser = async (req, res) => {
  try {
    const userData = req.body;
    if (userData === undefined)
      return res.status(400).json({ message: "user data requireds" });
    const userExist = await User.findOne({ email: userData.email });
    if (userData.email === undefined) {
      return res.status(400).json({ message: "email required" });
    }
    if (userData.password === undefined) {
      return res.status(400).json({ message: "password required" });
    }
    if (userData.name === undefined) {
      return res.status(400).json({ message: "name required" });
    }
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email)
    ) {
      return res.status(400).json({ message: "enter vaild mail " });
    }
    if (userData.role === undefined) {
      userData.role = "user";
    }

    if (userExist) {
      return res
        .status(400)
        .json({ message: `${userData.email} is already exists,  try other` });
    }

    const newUser = new User(userData);

    const token = newUser.generateVerificationToken();

    if (!(await sentToken(newUser.email, token))) {
      return res.status(400).json({ message: `somethig went worng` });
    }

    await newUser.save();

    return res
      .status(200)
      .json({ message: "verfication sented thorugh email, verify your mail" });
  } catch (err) {
    return res.status(404).json({ message: "someething went worng" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const hashToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({ verificationtoken: hashToken });

    if (!user) {
      return res.status(401).json({ message: "Invalid link" });
    }
    if (user.verified) {
      return res.status(200).json({ message: "user already verifyed" });
    }
    if (user.verificationvalidity < Date.now()) {
      return res.status(401).json({ message: "verification link expired" });
    }
    user.verified = true;
    user.save();
    return res.json({ message: "verifyed" });
  } catch (err) {
    return res.status(404).json({ message: `somethig went worng` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === undefined) {
      return res.status(400).json({ message: "email required" });
    }
    if (password === undefined) {
      return res.status(400).json({ message: "password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isCorrectPass = await user.verifyPassword(password);

    if (!isCorrectPass) {
      return res.status(400).json({ message: "worng password" });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "verify your email id" });
    }

    const token = await jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    const userData = await User.findOne(
      { _id: req.user.id },
      {
        verificationtoken: 0,
        verificationvalidity: 0,
        password: 0,
        __v: 0,
      }
    );

    return res.status(200).json({ token, user: userData });
  } catch (err) {
    return res.status(404).json({ message: `somethig went worng` });
  }
};

const resendVerifyLink = async (req, res) => {
  try {
    const { email } = req.query;
    if (
      email === "" ||
      !email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      return res.status(400).json({ message: "enter valid email" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (user.verified) {
      return res.status(200).json({ message: "user already verifyed" });
    }

    const token = user.generateVerificationToken();

    if (!(await sentToken(email, token))) {
      return res.status(404).json({ message: `somethig went worng` });
    }

    await user.save();

    return res.status(200).json({
      message: "verfication link resented thorugh email, verify your email",
    });
  } catch (err) {
    return res.status(404).json({ message: `somethig went worng` });
  }
};

module.exports = { signupUser, verifyEmail, login, resendVerifyLink };
