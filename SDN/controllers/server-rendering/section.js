const mongoose = require("mongoose");
const Section = require("../../models/section");
const Course = require("../../models/course");

exports.findAll = async (req, res) => {
  try {
    const sections = await Section.find().populate("course");
    const courses = await Course.find();
    return res.render("section", { sections, courses });
  } catch (error) {
    return res.render("error", { error });
  }
};

// exports.getDetail = async (req, res) => {
//   try {
//     const section = await Section.findById(req.params.id).populate("course");

//     if (!section) {
//       return res.render("notFound");
//     }

//     return res.status(200).json({ status: true, section });
//   } catch (error) {
//     return res.render("error", { error });
//   }
// };

exports.create = async (req, res) => {
  try {
    const section = await Section.create(req.body);
    console.log(req.body);

    return res.redirect("/view/sections");
  } catch (error) {
    return res.render("error", { error });
  }
};

exports.update = async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!section) {
      throw new Error("Section not found");
    }
    console.log(req.body);

    return res.redirect("/view/sections");
  } catch (error) {
    return res.render("error", { error });
  }
};

exports.delete = async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);

    if (!section) {
      throw new Error("Section not found");
    }

    return res.redirect("/view/sections");
  } catch (error) {
    return res.render("error", { error });
  }
};
