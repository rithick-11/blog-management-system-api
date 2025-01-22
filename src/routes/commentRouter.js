const express = require("express")
const Comment = require("../models/Comment")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const { addComment } = require("../controllers/commentController")

const router = express.Router()

router.post("/add/:blogId", authentication, authorization("admin", "editor", "user"), addComment)


module.exports = router