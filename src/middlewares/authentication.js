const jwt = require("jsonwebtoken");
const User = require("../models/User");


const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(400)
      .json({ message: "Authorization header not provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Token not provided" });
  }
  try {
    const data = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({_id:data.id})
    
    if(!user.verified){
      return res.status(404).json({message:"verify your email"})
    }
    
    req.user = {
        id: user._id,
        role: user.role
    }
    
    next();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = authentication;
