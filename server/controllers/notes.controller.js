const Notes = require("../models/notes.model");
const Student = require("../models/student.model");

module.exports = {
  // queries here
  createNewNotes: (req, res) => {
    Notes.create(req.body)
      .then((newNotes) => {
        console.log("createNewNotes success");
        console.log(newNotes);
        res.json(newNotes);
      })
      .catch((err) => {
        console.log("createNewNotes failed");
        console.log(err);
        res.status(400).json(err);
      });
  },
  getAllNotes: (req, res) => {
    Notes.find()
      .then((allNotess) => {
        console.log("getAllNotess success");
        console.log(allNotess);
        res.json(allNotess);
      })
      .catch((err) => {
        console.log("getAllNotess failed");
        console.log(err);
        res.json(err);
      });
  },
  getAllNotesForStudent: (req, res) => {
    Notes.find({ student: req.params.studentId })
      .populate("student")
      .then((studentNotes) => {
        console.log("getAllNotesForStudent success");
        console.log(studentNotes);
        res.json(studentNotes);
      })
      .catch((err) => {
        console.log("getAllStudentsWithTeacher failed");
        console.log(err);
        res.json(err);
      });
  },
  getOneNote: (req, res) => {
    Notes.findOne({ _id: req.params.id })
      .then((oneNotes) => {
        console.log("getOneNotes success");
        console.log(oneNotes);
        res.json(oneNotes);
      })
      .catch((err) => {
        console.log("getOneNotes failed");
        console.log(err);
        res.status(400).json(err);
      });
  },
  updateOneNotes: (req, res) => {
    Notes.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then((updatedNotes) => {
        console.log("updateOneNotes success");
        console.log(updatedNotes);
        res.json(updatedNotes);
      })
      .catch((err) => {
        console.log("updateNotes failed");
        console.log(err);
        res.status(400).json(err);
      });
  },
  deleteOneNotes: (req, res) => {
    Notes.deleteOne({ _id: req.params.id })
      .then((deletedNotes) => {
        console.log("deleteOneNotes success");
        console.log(deletedNotes);
        res.json(deletedNotes);
      })
      .catch((err) => {
        console.log("deleteOneNotes failed");
        console.log(err);
        res.json(err);
      });
  },
};
