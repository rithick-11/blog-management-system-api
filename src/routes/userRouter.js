const express = require("express")
const authentication = require("../middlewares/authentication")
const { user } = require("../controllers/userController")

const router = express.Router()

router.get("/user", authentication, user)

module.exports = router