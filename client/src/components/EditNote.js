import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NoteForm from "./NoteForm";

const EditNote = ({ teacher, studentList }) => {
  const [note, setNote] = useState({});
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const { noteId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/notes/${noteId}`)
      .then((res) => {
        console.log(res.data);
        setNote(res.data);
        // debugger;
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
      {loaded && (
        <NoteForm
          onSubmitProp={updateNote}
          initialStudent={note.student}
          initialDescription={note.description}
          initialVideo={note.video}
          initialDate={note.date}
          studentList={studentList}
          teacher={teacher}
        />
      )}
    </div>
  );
};

export default EditNote;
