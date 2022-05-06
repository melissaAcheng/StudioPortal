const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm Password is required"],
    },
    // students: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Students",
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
