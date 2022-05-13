const { authenticate } = require("../config/jwt.config");
const StudentController = require("../controllers/student.controller");

module.exports = (app) => {
  app.post("/api/students/register", StudentController.registerStudent);
  app.post("/api/students/login", StudentController.loginStudent);
  // app.post("/api/students/logout", StudentController.logoutStudent);
  app.get("/api/students", authenticate, StudentController.getLoggedInStudent);

  app.get("/api/students/all", StudentController.getAllStudents);
  app.get("/api/students/:id", StudentController.getOneStudent);
  // app.get("/api/students/:id", StudentController.getAllStudents);
  // app.get("/api/students/teacher/:teacherId", StudentController.getAllStudentsWithTeacher);
  app.put("/api/students/:id", StudentController.updateOneStudent);
  app.delete("/api/students/:id", StudentController.deleteOneStudent);
};
