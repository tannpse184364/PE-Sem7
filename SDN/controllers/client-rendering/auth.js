const Member = require("../../models/member");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const findAccount = await Member.findOne({ userName });
    if (findAccount) {
      throw new Error("userName already exists!");
    }
    const newPassword = await bcrypt.hash(password, 3);
    const newAccount = await Member.create({
      userName,
      password: newPassword,
    });
    return res.status(201).json({ status: true, newAccount });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.login = async (req, res) => {
  const secretKey = process.env.JWT_SECRET;
  try {
    const { userName, password } = req.body;

    const findAcc = await Member.findOne({ userName });
    if (!findAcc) {
      throw new Error("Username or password is incorrect");
    }
    const isMatch = await bcrypt.compare(password, findAcc.password);

    if (!isMatch) {
      throw new Error("Username or password is incorrect");
    }
    const accessToken = jwt.sign(
      {
        userId: findAcc._id,
      },
      secretKey,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ status: true, accessToken });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
