const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");

module.exports = {
  // queries here
  createNewTeacher: (req, res) => {
    Teacher.create(req.body)
      .then((newTeacher) => {
        console.log("createNewTeacher success");
        console.log(newTeacher);
        res.json(newTeacher);
      })
      .catch((err) => {
        console.log("createNewTeacher failed");
        console.log(err);
        res.status(400).json(err);
      });
  },
  getAllTeachers: (req, res) => {
    Teacher.find()
      .then((allTeachers) => {
        console.log("getAllTeachers success");
        console.log(allTeachers);
        res.json(allTeachers);
      })
      .catch((err) => {
        console.log("getAllTeachers failed");
        console.log(err);
        res.json(err);
      });
  },
  getOneTeacher: (req, res) => {
    Teacher.findOne({ _id: req.params.id })
      .then((oneTeacher) => {
        console.log("getOneTeacher success");
        console.log(oneTeacher);
        res.json(oneTeacher);
      })
      .catch((err) => {
        console.log("getOneTeacher failed");
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get list of all students associated with teacher
  // find One Teacher, list all students under teacher
  // getStudents: (req, res) => {
  //   Teacher.findOne({ _id: req.params.id })
  //     .populate("students")
  //     .exec()
  //     .then((teacherStudents) => {
  //       console.log("getStudents success");
  //       console.log(teacherStudents);
  //       res.json(teacherStudents);
  //     })
  //     .catch((err) => {
  //       console.log("getStudents failed");
  //       console.log(err);
  //       res.json(err);
  //     });
  // },
  updateOneTeacher: (req, res) => {
    Teacher.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then((updatedTeacher) => {
        console.log("updateOneTeacher success");
        console.log(updatedTeacher);
        res.json(updatedTeacher);
      })
      .catch((err) => {
        console.log("updateTeacher failed");
        console.log(err);
        res.status(400).json(err);
      });
  },
  deleteOneTeacher: (req, res) => {
    Teacher.deleteOne({ _id: req.params.id })
      .then((deletedTeacher) => {
        console.log("deleteOneTeacher success");
        console.log(deletedTeacher);
        res.json(deletedTeacher);
      })
      .catch((err) => {
        console.log("deleteOneTeacher failed");
        console.log(err);
        res.json(err);
      });
  },
};
