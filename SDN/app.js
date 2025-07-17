var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const course = require("./models/course");
const section = require("./models/section");
const member = require("./models/member");
const courseRouter = require("./routes/client-rendering/course");
const authRouter = require("./routes/client-rendering/auth");
// const memberRouter = require("./routes/memberRouter");

const uri = process.env.MONGO_URI;
const connect = mongoose.connect(uri);
connect.then((db) => {
  console.log("Connect ok!");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/view/auth", authRouter);
app.use("/api/courses", courseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
