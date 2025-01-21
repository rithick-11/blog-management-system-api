const User = require("../models/User");

const user = async (req, res) => {
    console.log(req.user);
    return res.status(202).json(req.user)
}

module.exports = {user}