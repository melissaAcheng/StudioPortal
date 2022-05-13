import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import Navbar from "./Navbar";
import { dateFormatter } from "../utils/dateFormatter";

const StudentProfile = ({ isTeacherLoggedIn }) => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [noteList, setNoteList] = useState([]);
  let { studentId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/students/${studentId}`)
      .then((res) => {
        console.log(res.data);
        setStudent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/notes/student/${studentId}`)
      .then((res) => {
        console.log(res.data);
        setNoteList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logout = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        isTeacherLoggedIn ? navigate("/teachers") : navigate("/students");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <h1 className="font-medium leading-tight text-5xl text-black-600 p-3">
        {student.firstName} {student.lastName}
      </h1>
      <h3 className="font-light leading-tight text-3xl text-black-600 p-3">Lesson Notes</h3>
      <div>
        <table className="w-full mt-5 table-auto flex items-center justify-center text-lg text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <th scope="col" className="px-6 py-3">
                Lesson Date
              </th>
              <th scope="col" className="px-6 py-3">
                Teacher
              </th>
            </tr>
            {noteList
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((note, idx) => {
                return (
                  <tr
                    key={idx}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      <Link to={`/notes/${note._id}`} className="no-underline hover:underline text-blue-500 text-lg">
                        {dateFormatter(note.date)}
                      </Link>
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {note.createdBy.firstName} {note.createdBy.lastName}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        {isTeacherLoggedIn && (
          <Link to={"/teachers/home"} className="text-decoration: underline text-blue-500">
            Back
          </Link>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
