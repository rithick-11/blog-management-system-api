const express = require("express")
const Comment = require("../models/Comment")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const { addComment, deleteComment } = require("../controllers/commentController")

const router = express.Router()

router.post("/add/:blogId", authentication, addComment)
router.delete("/delete/:commentId", authentication, deleteComment)


module.exports = router