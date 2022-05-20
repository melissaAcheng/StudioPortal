import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { dateFormatter } from "../utils/dateFormatter";

const ViewNote = ({ isTeacherLoggedIn }) => {
  const navigate = useNavigate();
  const [note, setNote] = useState({});
  let { noteId } = useParams();

  // debugger;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/notes/${noteId}`)
      .then((res) => {
        console.log(res.data);
        setNote(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/notes/${noteId}`)
      .then((res) => {
        console.log(res);
        navigate(`/students/${note.student}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar />
      <h1 className="font-medium leading-tight text-3xl text-black-600 p-3">{dateFormatter(note.date)}</h1>
      <div>
        <table className="w-full mt-5 table-auto flex items-center justify-center text-lg text-left text-black-500 dark:text-black-400">
          <tbody>
            <tr>
              <th className="text-md text-black-700 uppercase dark:text-black-400">Description</th>
              <td className="px-6 py-3">{note.description}</td>
            </tr>
            <tr>
              <th className="text-md text-black-700 uppercase dark:text-black-400">Video</th>
              <td className="px-6 py-3">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${note.video}`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <div className="mb-5">
          {isTeacherLoggedIn && (
            <Link to={`/notes/edit/${note._id}`} className="text-decoration: underline text-blue-500">
              Edit
            </Link>
          )}
          {isTeacherLoggedIn && (
            <button onClick={handleDelete} className="bg-red-500 px-4 ml-4 text-white rounded-md">
              Delete
            </button>
          )}
        </div>
        <div>
          <Link to={`/students/${note.student}`} className="text-decoration: underline text-blue-500">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
