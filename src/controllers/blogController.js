const Blog = require("../models/Blog");
const User = require("../models/User");

const getBlog = async (req, res) => {
  const blogs = await Blog.find()
    .populate({
      path: "author",
      select: "name email",
    })
    .populate({
      path: "comments",
      populate: { path: "author", select: "name" },
    });
  return res.status(202).json({ blogs });
};

const createBlog = async (req, res) => {
  try {
    const { tittle, content } = req.body;
    if (tittle === "" || !tittle) {
      return res.status(400).json({ message: "blog tittle required" });
    }
    if (content === "" || !content) {
      return res.status(400).json({ message: "blog content required" });
    }
    const newBlog = new Blog({ tittle, content, author: req.user.id });
    await newBlog.save();
    return res.status(202).json({ message: "blog created sucessfully" });
  } catch (err) {
    return res.status(404).json({ message: "Something went worng" });
  }
};

const asignEditor = async (req, res) => {
  try {
    const { blogId, editorId } = req.params;
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }
    const editor = await User.findOne({ _id: editorId });
    if (!editor) {
      return res.status(404).json({ message: "editor not found" });
    }
    blog.editor = editor._id;
    await blog.save();
    return res.status(202).json({ message: "asignr editor sucessfully" });
  } catch (err) {
    return res.status(404).json({ message: "Something went worng" });
  }
};

const editBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }
    if (req.user.role === "editor") {
      if (blog.editor.toString() !== req.user.id.toString()) {
        return res.status(403).json({
          message: "You are not assigned to this blog and cannot edit it.",
        });
      }
    }
    const { tittle, content } = req.body;
    if (tittle === "" || !tittle) {
      return res.status(400).json({ message: "blog tittle required" });
    }
    if (content === "" || !content) {
      return res.status(400).json({ message: "blog content required" });
    }
    blog.tittle = tittle;
    blog.content = content;
    await blog.save();
    return res.status(200).json({ message: "Blog updated successfully" });
  } catch (err) {
    return res.status(404).json({ message: "Something went worng" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }
    if (req.user.role === "editor") {
      if (blog.editor.toString() !== req.user.id.toString()) {
        return res.status(403).json({
          message: "You are not assigned to this blog and cannot delete it.",
        });
      }
    }
    await Blog.deleteOne({ _id: blogId });
    return res.status(202).json({ message: "Blog deleted succesfully" });
  } catch (err) {
    return res.status(404).json({ message: "Something went worng" });
  }
};

module.exports = { createBlog, getBlog, editBlog, deleteBlog, asignEditor };
