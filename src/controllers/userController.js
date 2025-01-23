const User = require("../models/User");

const user = async (req, res) => {
  try {
    const user = await User.findOne(
      { _id: req.user.id },
      {
        verificationtoken: 0,
        verificationvalidity: 0,
        password: 0,  
        __v: 0,
      }
    );
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({ message: `somethig went worng` });
  }
};

module.exports = { user };
