const mongoose = require("mongoose");
const schema = mongoose.Schema;

const sectionSchema = new schema(
  {
    sectionName: { type: String, required: true },
    sectionDescription: { type: String, required: true },
    duration: { type: Number, required: true },
    isMainTask: { type: Boolean, default: false },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      require: true,
    },
  },
  { timestamps: true }
);

const Section = mongoose.model("Section", sectionSchema);
module.exports = Section;
