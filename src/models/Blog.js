const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    editor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
      default:[]
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog
