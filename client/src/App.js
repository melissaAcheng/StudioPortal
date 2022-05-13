import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeacherLogReg from "../src/views/TeacherLogReg";
import StudentLogReg from "./views/StudentLogReg";
import TeacherHome from "./components/TeacherHome";
import StudentProfile from "./components/StudentProfile";
import ViewNote from "./components/ViewNote";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";

function App() {
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);
  const [teacher, setTeacher] = useState([]);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/teachers", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data != null) {
          setIsTeacherLoggedIn(true);
          setTeacher(res.data);
          setStudentList(res.data.students);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<TeacherLogReg />} path="/teachers" />
          <Route element={<StudentLogReg />} path="/students" />
          <Route element={<TeacherHome teacher={teacher} studentList={studentList} setStudentList={setStudentList}/>} path="/teachers/home" />
          <Route element={<StudentProfile isTeacherLoggedIn={isTeacherLoggedIn} />} path="/students/:studentId" />
          <Route element={<CreateNote teacher={teacher} studentList={studentList} />} path="/notes/addNote" />
          <Route element={<EditNote teacher={teacher} studentList={studentList} />} path="/notes/edit/:noteId" />
          <Route element={<ViewNote isTeacherLoggedIn={isTeacherLoggedIn} />} path="/notes/:noteId" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
