const TeacherController = require("../controllers/teacher.controller");

module.exports = (app) => {
  app.post("/api/teachers", TeacherController.createNewTeacher);
  app.get("/api/teachers", TeacherController.getAllTeachers);
  app.get("/api/teachers/:id", TeacherController.getOneTeacher);
  // app.get("/api/teachersStudents/:id", TeacherController.getStudents);
  app.put("/api/teachers/:id", TeacherController.updateOneTeacher);
  app.delete("/api/teachers/:id", TeacherController.deleteOneTeacher);
};
