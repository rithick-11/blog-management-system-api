const Blog = require("../models/Blog");

const getBlog = async (req, res) => {
  const blogs = await Blog.find().populate({ path: "author", select: "name email" });
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
    console.log(err);

    return res.status(404).json({ message: "Something went worng" });
  }
};

module.exports = { createBlog, getBlog };
