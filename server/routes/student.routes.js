const StudentController = require("../controllers/student.controller");

module.exports = (app) => {
  app.post("/api/students", StudentController.createNewStudent);
  app.get("/api/students", StudentController.getAllStudents);
  app.get("/api/students/:id", StudentController.getOneStudent);
  app.get("/api/students/:id", StudentController.getAllStudents);
  app.get("/api/students/teacher/:teacherId", StudentController.getAllStudentsWithTeacher);
  app.put("/api/students/:id", StudentController.updateOneStudent);
  app.delete("/api/students/:id", StudentController.deleteOneStudent);
};
