import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeacherLogReg from "../src/views/TeacherLogReg";
import StudentLogReg from "./views/StudentLogReg";
import TeacherHome from "./components/TeacherHome";
import NoteForm from "./components/NoteForm";
import StudentProfile from "./components/StudentProfile";
import ViewNote from "./components/ViewNote";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<TeacherLogReg />} path="/teachers" />
          <Route element={<StudentLogReg />} path="/students" />
          <Route element={<TeacherHome />} path="/teachers/home" />
          <Route element={<StudentProfile />} path="/students/:studentId" />
          <Route element={<CreateNote />} path="/notes/addNote" />
          <Route element={<EditNote />} path="/notes/edit/:noteId"/>
          <Route element={<ViewNote />} path="/notes/:noteId" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
