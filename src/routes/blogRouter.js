const express = require("express");
const router = express.Router();

const { createBlog, getBlog } = require("../controllers/blogController");
const authentication = require("../middlewares/authentication")

router.get('/',getBlog);
router.post("/create",authentication , createBlog);

module.exports = router;
