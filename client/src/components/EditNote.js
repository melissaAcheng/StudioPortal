import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NoteForm from "./NoteForm";

const EditNote = ({ loggedInUser, studentList }) => {
  const [note, setNote] = useState({});
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const { noteId } = useParams();

  const dateInput = (date) => {
    // const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    // const d = new Date(date);
    // const month = d.getMonth() + 1;
    // const day = d.getDate() + 1;
    // const year = d.getFullYear();
    // return `${year}-${month}-${day}`;
    let yourDate = new Date(date);
    // const offset = yourDate.getTimezoneOffset();
    // yourDate = new Date(yourDate.getTime() - offset * 60000);
    // return yourDate.toISOString().split("T")[0];
    const utc = yourDate.getTime() + yourDate.getTimezoneOffset() * 60000;
    const newDate = new Date(utc + 3600000 * -4);
    // return newDate.toLocaleDateString();
    return yourDate.toISOString().split("T")[0];
  };
  // debugger;
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
        navigate("/teachers");
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
          initialDate={dateInput(note.date)}
          studentList={studentList}
          teacher={loggedInUser}
        />
      )}
    </div>
  );
};

export default EditNote;
