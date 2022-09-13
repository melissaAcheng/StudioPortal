import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SearchVideo from "./SearchVideo";

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

  const onSubmitHandler = (e) => {
    debugger;
    e.preventDefault();
    onSubmitProp({
      student: student,
      date: date,
      description: description,
      video: video,
      createdBy: teacher,
    });
  };
  return (
    <div>
      <Navbar />
      <h1 className="font-light leading-tight text-3xl text-black-600 p-3">Lesson Note</h1>
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <form onSubmit={onSubmitHandler} className="w-full max-w-sm">
          {errors.student ? <p className="text-red-400">Please select a student</p> : null}
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">Student:</label>
            <select
              name="student"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              className="border-slate-300 hover:border-indigo-300 w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            >
              <option>Select Student</option>
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
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">Date:</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            ></input>
          </div>
          {errors.description ? <p className="text-red-400">{errors.description.message}</p> : null}
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">Description:</label>
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            ></textarea>
          </div>
          <div>
            <label className="form-label inline-block mb-2 text-gray-700">Videos:</label>
            <input type="hidden" name="video" value={video} onChange={(e) => setVideo(e.target.value)} />
            {video !== "" && (
              <iframe
                width="100%"
                height="50%"
                src={`https://www.youtube.com/embed/${video}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
          <div className="form-group mb-6">
            <SearchVideo video={video} setVideo={setVideo} />
          </div>
          <div>
            <button
              type="submit"
              className={`bg-blue-500 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
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
