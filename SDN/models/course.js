const mongoose = require("mongoose");
const schema = mongoose.Schema;

const courseSchema = new schema(
  {
    courseName: { type: String, required: true },
    courseDescription: { type: String, required: true },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
