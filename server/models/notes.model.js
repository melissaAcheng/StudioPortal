const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    description: {
      type: String,
      required: [true, "Assignments are required"],
    },
    video: {
      type: String,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      // type: String,
      ref: "Student",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", NotesSchema);
