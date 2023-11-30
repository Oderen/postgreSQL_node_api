const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/api/users");
const authRouter = require("./routes/api/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Server Error" } = err;
  if (err.code === "23505") res.status(409).json({ message: err.detail });
  if (err.code == "22P02") res.status(400).json({ message });

  res.status(status).json({ message });
});

module.exports = app;
