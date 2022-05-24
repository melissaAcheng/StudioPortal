const UserController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/users/register", UserController.registerUser); // logs in user upon successful registration
  app.post("/api/users/login", UserController.loginUser);
  app.post("/api/users/logout", UserController.logoutUser);
 
  app.put("/api/users/:id", UserController.updateOneUser);

  app.get("/api/users", authenticate, UserController.getLoggedInUser);
  app.get("/api/users/students", UserController.getAllStudents);
  app.get("/api/users/all", UserController.getAllUsers);
  app.get("/api/users/:id", UserController.getOneUser);
 
  app.delete("/api/users/:id", UserController.deleteOneUser);
};
