const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
      // min: "1990-01-01",
      // max: [new Date().getDate(), "Date cannot be in the future"],
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
      ref: "User",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", NotesSchema);
