const express = require("express");
const userRouter = require("./routes/users");
const requestRouter = require("./routes/request");
require("./db/mongoose");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Server Up and Working!");
});
app.use(userRouter);
app.use(requestRouter);
app.use(
  cors({
    credentials: true,
    origin: `https://travel-buddy-9f75.onrender.com:${port}`,
    allowedHeaders: ["sessionId", "Content-Type", "Authorization"],
    exposedHeaders: ["sessionId", "Authorization"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.listen(port, function () {
  console.log("Listening at port " + port);
});
