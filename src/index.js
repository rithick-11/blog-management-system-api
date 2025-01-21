const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRouter");

dotenv.config();

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

app.use(express.json());
app.use("/api/user", userRouter);
app.get("/", (req, res) => res.send("server working"));

startServerAndConnectDb();
