import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const TeacherHome = () => {
  const navigate = useNavigate();
  // State to hold new student
  const [student, setStudent] = useState("");
  // List of all students
  const [allStudents, setAllStudents] = useState([]);

  const [teacher, setTeacher] = useState([]);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data != null) {
          setTeacher(res.data);
          setStudentList(res.data.students);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/students")
      .then((res) => {
        console.log(res.data);
        setAllStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addStudent = (e) => {
    e.preventDefault();
    console.log(student);
    axios
      .put(
        `http://localhost:8000/api/users/${teacher._id}`,
        {
          students: [...studentList, student],
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("success", res);
        setStudentList([...studentList, filteredStudents().find((stu) => stu._id === student)]);
      })
      .catch((err) => {
        console.log("errors", err);
      });
  };

  const filteredStudents = () => allStudents.filter((student) => !studentList.find(({ _id }) => student._id === _id));

  return (
    <div>
      <Navbar />
      {/* <h1 className="font-medium leading-tight text-5xl text-black-600 p-3">
        Welcome {teacher.firstName} {teacher.lastName}
      </h1> */}
      <div>
        <h2 className="font-light leading-tight text-3xl text-black-600 p-3">Students</h2>
        <table className="table-auto w-full max-w-md py-5">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {studentList
              .sort((a, b) => a.lastName.localeCompare(b.lastName))
              .map((student, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Link
                        className="no-underline hover:underline text-blue-500 text-lg"
                        to={`/students/${student._id}`}
                      >
                        {student.firstName} {student.lastName}
                      </Link>
                    </td>
                    <td>{student.email}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* Add Student to List */}
        <form onSubmit={addStudent}>
          <div>
            <select
              name="student"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              className="text-white bg-blue-500 hover:bg-blue-800  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center mr-2"
            >
              <option>-------------</option>
              {filteredStudents().map((student, index) => {
                return (
                  <option key={index} value={student._id}>
                    {student.firstName} {student.lastName}
                  </option>
                );
              })}
            </select>
            <span>
              <button
                className={`bg-white-500 py-2 px-4 text-sm text-black rounded border border-black focus:outline-none focus:border-black-dark`}
              >
                Add Student
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherHome;
