import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/teachers", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data != null) {
          setIsTeacherLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logout = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        isTeacherLoggedIn ? navigate("/teachers") : navigate("/students");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-300 p-3">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <span className="font-semibold tracking-tight text-xl">Studio Portal</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-black-200 border-black-500 hover:text-black hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div className="w-full block lg:flex lg:items-center lg:w-auto">
        {isTeacherLoggedIn && (
          <div className="text-sm lg:flex-grow">
            <Link
              to={"/teachers/home"}
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-white-200 hover:text-white mr-4"
            >
              Students
            </Link>
            <Link
              to={"/notes/addNote"}
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-white-200 hover:text-white mr-4"
            >
              Add Lesson Note
            </Link>
          </div>
        )}

        <div>
          <button
            onClick={logout}
            to={""}
            href="#"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-white-500 hover:bg-white mt-4 lg:mt-0"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
