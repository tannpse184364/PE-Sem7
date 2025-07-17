const mongoose = require("mongoose");
const schema = mongoose.Schema;

const memberSchema = new schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
