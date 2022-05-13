import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import NoteForm from "./NoteForm";

const EditNote = () => {
  const [note, setNote] = useState({});
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [teacher, setTeacher] = useState([]);
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

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/notes/${noteId}`)
      .then((res) => {
        console.log(res.data);
        setNote(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateNote = (noteParam) => {
    axios
      .put(`http://localhost:8000/api/notes/${noteId}`, noteParam)
      .then((res) => {
        console.log(res.data);
        navigate(`/students/${note.student}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <NoteForm
        onSubmitProp={updateNote}
        initialStudent={note.student}
        initialDescription={note.description}
        initialVideo={note.video}
        initialDate={note.date}
        studentList={studentList}
        teacher={teacher}
      />
    </div>
  );
};

export default EditNote;
