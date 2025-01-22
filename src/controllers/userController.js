const User = require("../models/User");

const user = async (req, res) => {
  const user = await User.findOne(
    { _id: req.user.id },
    { _id: 0, verificationtoken: 0, verificationvalidity: 0, password: 0, __v:0 }
  );
  return res.status(202).json(user);
};

module.exports = { user };
