const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRouter");
const commentRouter = require("./routes/commentRouter");

const app = express();

const PORT = process.env.PORT || 5000;

const startServerAndConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log("Error at connecting servet");
  }
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
  });
};

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/comments", commentRouter);
app.get("/", (req, res) =>
  res.send(
    `RESTful Blog Management API server is runnging <a href="https://github.com/rithick-11/blog-management-system-api" target="_blank">click here </a> to read API documentaion`
  )
);

startServerAndConnectDb();
