const express = require("express")
const router = express.Router()

const {signupUser, verifyEmail, login} = require("../controllers/userContoller")



router.get("/", (req, res) => res.send("api user working"))
router.post("/signup", signupUser)
router.post("/login", login)
router.get("/verify/:token", verifyEmail )


module.exports = router

