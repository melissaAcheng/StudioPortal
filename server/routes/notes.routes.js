const { authenticate } = require("../config/jwt.config");
const NotesController = require("../controllers/notes.controller");

module.exports = (app) => {
  app.post("/api/notes", authenticate, NotesController.createNewNote);
  app.get("/api/notes", NotesController.getAllNotes);
  app.get("/api/notes/student/:studentId", NotesController.getAllNotesForStudent);
  app.get("/api/notes/:id", NotesController.getOneNote);
  app.put("/api/notes/:id", NotesController.updateOneNote);
  app.delete("/api/notes/:id", NotesController.deleteOneNote);
};
