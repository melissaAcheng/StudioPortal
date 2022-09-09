const Notes = require("../models/notes.model");
const jwt = require("jsonwebtoken");
// const apiKey = process.env.API_KEY;
// const baseApiUrl = "https://www.googleapis.com/youtube/v3";

module.exports = {
  // queries here
  createNewNote: (req, res) => {
    const newNoteObject = new Notes(req.body);

    const decodedJWT = jwt.decode(req.cookies.usertoken, {
      complete: true,
    });

    newNoteObject.createdBy = decodedJWT.payload.id;

    newNoteObject
      .save()
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
      .populate("createdBy", "firstName lastName email")
      .populate("student", "firstName lastName email")
      .then((allNotes) => {
        console.log("getAllNotess success");
        console.log(allNotes);
        res.json(allNotes);
      })
      .catch((err) => {
        console.log("getAllNotess failed");
        console.log(err);
        res.json(err);
      });
  },
  getAllNotesForStudent: (req, res) => {
    Notes.find({ student: req.params.studentId })
      .populate("createdBy", "firstName lastName email")
      .populate("student", "firstName lastName email")
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
      .populate("createdBy", "firstName lastName email")
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
  updateOneNote: (req, res) => {
    Notes.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then((updatedNote) => {
        console.log("updateOneNote success");
        console.log(updatedNote);
        res.json(updatedNote);
      })
      .catch((err) => {
        console.log("updateNote failed");
        console.log(err);
        res.status(400).json(err);
      });
  },
  deleteOneNote: (req, res) => {
    Notes.deleteOne({ _id: req.params.id })
      .then((deletedNote) => {
        console.log("deleteOneNote success");
        console.log(deletedNote);
        res.json(deletedNote);
      })
      .catch((err) => {
        console.log("deleteOneNote failed");
        console.log(err);
        res.json(err);
      });
  },
};
