import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const ViewNote = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({});
  let { noteId } = useParams();

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

  return (
    <div>
      <Navbar />
      <h1 className="font-medium leading-tight text-3xl text-black-600 p-3">{note.date}</h1>
      <div>
        <table className="w-full mt-5 table-auto flex items-center justify-center text-lg text-left text-black-500 dark:text-black-400">
          <tbody>
            <tr>
              <th className="text-md text-black-700 uppercase dark:text-black-400">Description</th>
              <td className="px-6 py-3">{note.description}</td>
            </tr>
            <tr>
              <th className="text-md text-black-700 uppercase dark:text-black-400">Video</th>
              <td className="px-6 py-3">{note.video}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <Link to={`/students/${note.student}`} className="text-decoration: underline text-blue-500">
          Back
        </Link>
      </div>
    </div>
  );
};

export default ViewNote;
