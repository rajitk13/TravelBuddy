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
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://travel-buddy-frontend.onrender.com');
  res.setHeader('Access-Control-Allow-Credentials','true');
  next();
})
app.get("/", (req, res) => {
  res.send("Server Up and Working!");
});
app.use(userRouter);
app.use(requestRouter);
app.use(
  cors({
    credentials: true,
    origin:  function(origin, callback){
      return callback(null, true);
    },
    allowedHeaders: ["sessionId", "Content-Type", "Authorization"],
    exposedHeaders: ["sessionId", "Authorization"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.listen(port, function () {
  console.log("Listening at port " + port);
});
