const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { type } = require("os");
const { stringify } = require("querystring");
const { timeStamp } = require("console");

const userShema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "editor", "user"],
      default: "User",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationtoken: { type: String },
    verificationvalidity: { type: Date },
  },
  { timestamps: true }
);

//hasing the password

userShema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userShema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userShema.methods.generateVerificationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.verificationtoken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.verificationvalidity = Date.now() + 60 * 60 * 1000 * 24;
  return token;
};

const User = mongoose.model("User", userShema);

module.exports = User;
