const Student = require("../models/student.model");

module.exports = {
  // queries here
  createNewStudent: (req, res) => {
    Student.create(req.body)
      .then((newStudent) => {
        console.log("createNewStudent success");
        console.log(newStudent);
        res.json(newStudent);
      })
      .catch((err) => {
        console.log("createNewStudent failed");
        console.log(err);
        res.status(400).json(err);
      });
  },
  getAllStudents: (req, res) => {
    Student.find()
      .then((allStudents) => {
        console.log("getAllStudents success");
        console.log(allStudents);
        res.json(allStudents);
      })
      .catch((err) => {
        console.log("getAllStudents failed");
        console.log(err);
        res.json(err);
      });
  },
  getAllStudentsWithTeacher: (req, res) => {
    Student.find({ teacher: req.params.teacherId })
      .populate("teacher")
      .then((studentsWithTeacher) => {
        console.log("getAllStudentsWithTeacher success");
        console.log(studentsWithTeacher);
        res.json(studentsWithTeacher);
      })
      .catch((err) => {
        console.log("getAllStudentsWithTeacher failed");
        console.log(err);
        res.json(err);
      });
  },
  getOneStudent: (req, res) => {
    Student.findOne({ _id: req.params.id })
      .then((oneStudent) => {
        console.log("getOneStudent success");
        console.log(oneStudent);
        res.json(oneStudent);
      })
      .catch((err) => {
        console.log("getOneStudent failed");
        console.log(err);
        res.status(400).json(err);
      });
  },
  updateOneStudent: (req, res) => {
    Student.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then((updatedStudent) => {
        console.log("updateOneStudent success");
        console.log(updatedStudent);
        res.json(updatedStudent);
      })
      .catch((err) => {
        console.log("updateStudent failed");
        console.log(err);
        res.status(400).json(err);
      });
  },
  deleteOneStudent: (req, res) => {
    Student.deleteOne({ _id: req.params.id })
      .then((deletedStudent) => {
        console.log("deleteOneStudent success");
        console.log(deletedStudent);
        res.json(deletedStudent);
      })
      .catch((err) => {
        console.log("deleteOneStudent failed");
        console.log(err);
        res.json(err);
      });
  },
};
