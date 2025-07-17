const Member = require("../../models/member");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getLoginView = async (req, res) => {
  return res.render("login", {
    message: req.session?.message,
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Member.findOne({ username });
    if (!user) {
      req.session.message = "Username or password is incorrect!";
      return res.redirect("/view/auth/login");
    }
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.message = null;
      req.session.user = user;
      return res.redirect("/view/sections");
    }
  } catch (error) {
    console.error("Login Error:", error);
    req.session.message = "An error occurred during login. Please try again.";
    return res.redirect("/view/auth/login");
  }
};
