import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NoteForm from "./NoteForm";

const EditNote = ({ loggedInUser, studentList }) => {
  const [note, setNote] = useState({});
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [errors, setErrors] = useState({});

  const dateInput = (date) => {
    let yourDate = new Date(date);
    const utc = yourDate.getTime() + yourDate.getTimezoneOffset() * 60000;
    const newDate = new Date(utc + 3600000 * -4);
    return yourDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/notes/${noteId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data === null) navigate("/");
        setNote(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        navigate("/teachers");
      });
  }, []);

  const updateNote = (noteParam) => {
    axios
      .put(`http://localhost:8000/api/notes/${noteId}`, noteParam)
      .then((res) => {
        console.log(res.data);
        setErrors({});
        navigate(`/students/${note.student}`);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
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
          initialDate={dateInput(note.date)}
          studentList={studentList}
          teacher={loggedInUser}
          errors={errors}
        />
      )}
    </div>
  );
};

export default EditNote;
