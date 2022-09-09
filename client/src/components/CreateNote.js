import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoteForm from "./NoteForm";
import SearchVideo from "./SearchVideo";

const CreateNote = ({ loggedInUser, studentList }) => {
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [student, setStudent] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
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

        { withCredentials: true }
      )
      .then((res) => {
        console.log("success", res);
        setErrors({});
        navigate("/teachers/home");
      })
      .catch((err) => {
        console.log("errors", err.response.data.errors);
        setErrors(err.response.data.errors);
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
        teacher={loggedInUser}
        errors={errors}
      />
    </div>
  );
};

export default CreateNote;
