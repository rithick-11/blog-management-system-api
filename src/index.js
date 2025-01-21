const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRouter")

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
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter)
app.use("/api/blog", blogRouter)
app.get("/", (req, res) => res.send("server working"));

startServerAndConnectDb();
