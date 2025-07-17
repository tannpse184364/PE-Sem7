const mongoose = require("mongoose");
const Course = require("../../models/course");

exports.findAll = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json({ status: true, courses });
  } catch (error) {
    return res.status(500).json({ status: false, msg: error.message });
  }
};

exports.getDetail = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ status: false, msg: "Course not found" });
    }

    return res.status(200).json({ status: true, course });
  } catch (error) {
    return res.status(500).json({ status: false, msg: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    return res
      .status(201)
      .json({ status: true, msg: "Course created successfully", course });
  } catch (error) {
    return res.status(500).json({ status: false, msg: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({ status: false, msg: "Course not found" });
    }

    return res
      .status(200)
      .json({ status: true, msg: "Course updated successfully", course });
  } catch (error) {
    return res.status(500).json({ status: false, msg: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ status: false, msg: "Course not found" });
    }

    return res
      .status(200)
      .json({ status: true, msg: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, msg: error.message });
  }
};
