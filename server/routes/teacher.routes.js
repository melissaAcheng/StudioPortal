const TeacherController = require("../controllers/teacher.controller");

module.exports = (app) => {
  app.post("/api/teachers/register", TeacherController.registerTeacher);
  app.post("/api/teachers/login", TeacherController.loginTeacher);
  app.post("/api/teachers/logout", TeacherController.logoutTeacher);
  app.get("/api/teachers", TeacherController.getLoggedInTeacher);

  // app.get("/api/teachers", TeacherController.getAllTeachers);
  app.get("/api/teachers/:id", TeacherController.getOneTeacher);
  // app.get("/api/teachersStudents/:id", TeacherController.getStudents);
  app.put("/api/teachers/:id", TeacherController.updateOneTeacher);
  app.delete("/api/teachers/:id", TeacherController.deleteOneTeacher);
};
