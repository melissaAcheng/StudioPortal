const Student = require("../models/student.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // queries here
  registerStudent: (req, res) => {
    const student = new Student(req.body);
    student
      .save()
      .then((newStudent) => {
        console.log(newStudent);
        console.log("Student Account Successfully Registered");
        res.json({
          successMessage: "Thank you for registering",
          student: newStudent,
        });
      })
      .catch((err) => {
        console.log("Registration not successful!");
        res.status(400).json(err);
      });
  },

  loginStudent: (req, res) => {
    Student.findOne({ email: req.body.email })
      .then((studentRecord) => {
        if (studentRecord === null) {
          res.status(400).json({ message: "Invalid student login attempt" });
        } else {
          bcrypt
            .compare(req.body.password, studentRecord.password)
            .then((isPasswordValid) => {
              if (isPasswordValid) {
                console.log("Password is valid");
                res
                  .cookie(
                    "usertoken",
                    jwt.sign(
                      {
                        id: studentRecord._id,
                        email: studentRecord.email,
                        firstName: studentRecord.firstName,
                        lastName: studentRecord.lastName,
                      },
                      process.env.JWT_SECRET
                    ),
                    {
                      httpOnly: true,
                      expires: new Date(Date.now() + 9000000),
                    }
                  )
                  .json({
                    message: "Successful Student Login",
                    studentLoggedIn: studentRecord.email,
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

  logoutStudent: (req, res) => {
    console.log("logging out");
    res.clearCookie("usertoken");
    res.json({
      message: "You have successfully logged out",
    });
  },

  getLoggedInStudent: (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {
      complete: true,
    });
    Student.findOne({
      _id: decodedJWT.payload.id,
    })
      .then((student) => {
        console.log(student);
        res.json(student);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // createNewStudent: (req, res) => {
  //   Student.create(req.body)
  //     .then((newStudent) => {
  //       console.log("createNewStudent success");
  //       console.log(newStudent);
  //       res.json(newStudent);
  //     })
  //     .catch((err) => {
  //       console.log("createNewStudent failed");
  //       console.log(err);
  //       res.status(400).json(err);
  //     });
  // },
  getAllStudents: (req, res) => {
    Student.find()
      .then((allStudents) => {
        console.log("getAllStudents success");
        console.log(allStudents);
        res.json(allStudents);
      })
      .catch((err) => {
        console.log("getAllStudents failed");
        console.log(err);
        res.json(err);
      });
  },
  getAllStudentsWithTeacher: (req, res) => {
    Student.find({ teacher: req.params.teacherId })
      .populate("teacher")
      .then((studentsWithTeacher) => {
        console.log("getAllStudentsWithTeacher success");
        console.log(studentsWithTeacher);
        res.json(studentsWithTeacher);
      })
      .catch((err) => {
        console.log("getAllStudentsWithTeacher failed");
        console.log(err);
        res.json(err);
      });
  },
  getOneStudent: (req, res) => {
    Student.findOne({ _id: req.params.id })
      .then((oneStudent) => {
        console.log("getOneStudent success");
        console.log(oneStudent);
        res.json(oneStudent);
      })
      .catch((err) => {
        console.log("getOneStudent failed");
        console.log(err);
        res.status(400).json(err);
      });
  },
  updateOneStudent: (req, res) => {
    Student.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then((updatedStudent) => {
        console.log("updateOneStudent success");
        console.log(updatedStudent);
        res.json(updatedStudent);
      })
      .catch((err) => {
        console.log("updateStudent failed");
        console.log(err);
        res.status(400).json(err);
      });
  },
  deleteOneStudent: (req, res) => {
    Student.deleteOne({ _id: req.params.id })
      .then((deletedStudent) => {
        console.log("deleteOneStudent success");
        console.log(deletedStudent);
        res.json(deletedStudent);
      })
      .catch((err) => {
        console.log("deleteOneStudent failed");
        console.log(err);
        res.json(err);
      });
  },
};
