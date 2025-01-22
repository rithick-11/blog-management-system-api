const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

const addComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const { text } = req.body;
    if (!text || text === "") {
      return res.status(404).json({ message: "enter a comment" });
    }
    const newComment = new Comment({
      text,
      blog: blog._id,
      author: req.user.id,
    });

    blog.comments.push(newComment._id);

    await newComment.save();
    await blog.save();

    return res.status(200).json({ message: "comment added successfully" });
  } catch (err) {
    return res.status(404).json({ message: "Something went worng" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findOne({ _id: commentId });
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
    if (comment.author.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "no access to delete this comment" });
    }

    const blog = await Blog.findOne({
      _id: comment.blog,
    });
    blog.comments.remove(commentId);
    await blog.save();
    await Comment.deleteOne({ _id: commentId });
    return res.status(202).json({ message: "comment deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Something went worng" });
  }
};

module.exports = { addComment, deleteComment };
