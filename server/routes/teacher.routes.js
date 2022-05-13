const TeacherController = require("../controllers/teacher.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/teachers/register", TeacherController.registerTeacher);
  app.post("/api/teachers/login", TeacherController.loginTeacher);
  app.get("/api/teachers", authenticate, TeacherController.getLoggedInTeacher);
  
  // app.get("/api/teachers", TeacherController.getAllTeachers);
  app.get("/api/teachers/:id", TeacherController.getOneTeacher);
  // app.get("/api/teachersStudents/:id", TeacherController.getStudents);
  app.put("/api/teachers", TeacherController.updateOneTeacher);
  app.delete("/api/teachers/:id", TeacherController.deleteOneTeacher);
  
  app.post("/api/logout", TeacherController.logoutUser);
};
