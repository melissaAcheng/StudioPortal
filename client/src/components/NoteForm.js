import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const NoteForm = ({
  onSubmitProp,
  initialStudent,
  initialDate,
  initialDescription,
  initialVideo,
  studentList,
  teacher,
  errors,
}) => {
  const [student, setStudent] = useState(initialStudent);
  const [date, setDate] = useState(initialDate);
  const [description, setDescription] = useState(initialDescription);
  const [video, setVideo] = useState(initialVideo);

  const matchYoutubeUrl = (url) => {
    let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return "Video not found";
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmitProp({
      student: student,
      date: date,
      description: description,
      video: matchYoutubeUrl(video),
      createdBy: teacher,
    });
    // debugger;
  };
  return (
    <div>
      <Navbar />
      <h1 className="font-light leading-tight text-3xl text-black-600 p-3">Lesson Note</h1>
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <form onSubmit={onSubmitHandler} className="w-full max-w-sm">
          {errors.student ? <p className="text-red-400">Please select a student</p> : null}
          <div className="flex text-left">
            <label>Student:</label>
            <select
              name="student"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              className="border-slate-300 hover:border-indigo-300 w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            >
              <option>-------------</option>
              {studentList.map((student, index) => {
                return (
                  <option key={index} value={student._id}>
                    {student.firstName} {student.lastName}
                  </option>
                );
              })}
            </select>
          </div>
          {errors.date ? <p className="text-red-400">{errors.date.message}</p> : null}
          <div className="flex text-left">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            ></input>
          </div>
          {errors.description ? <p className="text-red-400">{errors.description.message}</p> : null}
          <div className="flex text-left">
            <label>Description:</label>
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            ></textarea>
          </div>
          <div className="flex text-left">
            <label>YouTube URL:</label>
            <input
              type="text"
              name="video"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            ></input>
          </div>
          <div>
            <button
              className={`bg-gray-500 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
