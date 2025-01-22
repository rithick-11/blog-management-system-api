const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlog,
  editBlog,
  deleteBlog,
  asignEditor,
} = require("../controllers/blogController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/", getBlog);
router.post(
  "/create",
  authentication,
  authorization("admin", "editor"),
  createBlog
);
router.get(
  "/asingedtior/:blogId/:editorId",
  authentication,
  authorization("admin"),
  asignEditor
);
router.put(
  "/edit/:blogId",
  authentication,
  authorization("admin", "editor"),
  editBlog
);
router.delete(
  "/delete/:blogId",
  authentication,
  authorization("admin", "editor"),
  deleteBlog
);

module.exports = router;
