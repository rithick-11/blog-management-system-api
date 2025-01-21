const User = require("../models/User");
const crypto = require("crypto");
const { sentToken } = require("../utils/sentMail");
const { use } = require("../routes/userRouter");

const signupUser = async (req, res) => {
  try {
    const userData = req.body;
    if (userData === undefined)
      return res.status(401).json({ message: "user data requireds" });
    const userExist = await User.findOne({ email: userData.email });
    if (userData.email === undefined) {
      return res.status(401).json({ message: "email required" });
    }
    if (userData.password === undefined) {
      return res.status(401).json({ message: "password required" });
    }
    if (userData.role === undefined) {
      userData.role = "user";
    }
    if (userExist) {
      return res
        .status(401)
        .json({ message: `${userData.email} is already exists,  try other` });
    }

    const newUser = new User(userData);

    const token = newUser.generateVerificationToken();

    if (!(await sentToken(newUser.email, token))) {
      return res.status(401).json({ message: `somethig went worng` });
    }

    newUser.save();

    return res
      .status(202)
      .json({ message: "user created successfully", token });
  } catch (err) {
    console.log(err);
    console.log("ok message");
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({ verificationtoken: hashToken });

  if(!user){
    return res.status(404).json({message:"link exprinded"})
  }

  if (user.verified) {
    return res.status(404).json({ message: "user already verifyed" });
  }

  if (user.verificationvalidity < Date.now()) {
    return res.status(401).json({ message: "verification expried" });
  }

  user.verified = true;

  user.save();

  console.log(user, token);
  return res.json({ message: "verifyed" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (email === undefined) {
    return res.status(401).json({ message: "email required" });
  }
  if (password === undefined) {
    return res.status(401).json({ message: "password required" });
  }

  const user = await User.findOne({email})

  if(!user){
    return res.status(403).json({message:"user not found"})
  }

  if(!user.verified){
    return res.status(403).json({message: "verify you email id"})
  }

  const isCorrectPass = await user.verifyPassword(password)

  console.log(isCorrectPass)

  if(!isCorrectPass){
    return res.status(404).json({message: "worng password"})
  }

  return res.status(202).json({message: "user login", token:""})
};

module.exports = { signupUser, verifyEmail, login };
