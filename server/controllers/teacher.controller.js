const Teacher = require("../models/teacher.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // queries here
  registerTeacher: (req, res) => {
    const teacher = new Teacher(req.body);
    teacher
      .save()
      .then((newTeacher) => {
        console.log(newTeacher);
        console.log("Successfully Registered!");
        res.json({
          successMessage: "Thank you for registering",
          teacher: newTeacher,
        });
      })
      .catch((err) => {
        console.log("Registration not successful!");
        res.status(400).json(err);
      });
  },

  loginTeacher: (req, res) => {
    Teacher.findOne({ email: req.body.email })
      .then((teacherRecord) => {
        if (teacherRecord === null) {
          res.status(400).json({ message: "Invalid teacher login attempt" });
        } else {
          // if email exists
          bcrypt
            .compare(req.body.password, teacherRecord.password)
            .then((isPasswordValid) => {
              if (isPasswordValid) {
                console.log("Password is valid");
                res
                  .cookie(
                    "usertoken",
                    jwt.sign(
                      {
                        // payload is the data we want to save and use
                        id: teacherRecord._id,
                        email: teacherRecord.email,
                        firstName: teacherRecord.firstName,
                        lastName: teacherRecord.lastName,
                        students: teacherRecord.students,
                      },
                      process.env.JWT_SECRET
                    ),
                    {
                      httpOnly: true,
                      expires: new Date(Date.now() + 9000000),
                    }
                  )
                  .json({
                    message: "Successful Teacher Login",
                    teacherLoggedIn: teacherRecord.email,
                    // teacherId: teacherRecord._id,
                  });
              } else {
                res.status(400).json({
                  message: "Invalid attempt",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ message: "Invalid attempt" });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Invalid attempt" });
      });
  },

  logoutUser: (req, res) => {
    console.log("logging out");
    res.clearCookie("usertoken");
    res.json({
      message: "You have successfully logged out",
    });
  },

  getLoggedInTeacher: (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {
      complete: true,
    });

    Teacher.findOne({
      // _id: req.jwtpayload.id,
      _id: decodedJWT.payload.id,
    })
      .populate("students", "firstName lastName")
      .then((teacher) => {
        console.log(teacher);
        res.json(teacher);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // createNewTeacher: (req, res) => {
  //   Teacher.create(req.body)
  //     .then((newTeacher) => {
  //       console.log("createNewTeacher success");
  //       console.log(newTeacher);
  //       res.json(newTeacher);
  //     })
  //     .catch((err) => {
  //       console.log("createNewTeacher failed");
  //       console.log(err);
  //       res.status(400).json(err);
  //     });
  // },
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
    const decodedJWT = jwt.decode(req.cookies.usertoken, {
      complete: true,
    });
    Teacher.findOneAndUpdate({ _id: decodedJWT.payload.id }, req.body, { new: true, runValidators: true })
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
