import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NoteForm from "./NoteForm";

const CreateNote = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState([]);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [student, setStudent] = useState();
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/teachers", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setTeacher(res.data);
        setStudentList(res.data.students);
      })
      .catch((err) => {
        console.log(err);
        navigate("/teachers");
      });
  }, []);

  const addNote = (noteParam) => {
    console.log({
      noteParam,
    });
    axios
      .post(
        "http://localhost:8000/api/notes",

        noteParam,
        // student,
        // date,
        // description,
        // video,
        // createdBy: teacher,

        { withCredentials: true }
      )
      .then((res) => {
        console.log("success", res);
        navigate("/teachers/home");
      })
      .catch((err) => {
        console.log("errors", err);
      });
  };

  return (
    <div>
      <NoteForm
        onSubmitProp={addNote}
        initialStudent=""
        initialDescription=""
        initialVideo=""
        initialDate=""
        studentList={studentList}
        teacher={teacher}
      />
    </div>
  );
};

export default CreateNote;
