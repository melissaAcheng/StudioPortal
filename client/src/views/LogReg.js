import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { Link } from "react-router-dom";

const LogReg = () => {
  return (
    <div className="flex flex-col h-screen">
      <h1 className="font-medium leading-tight text-5xl text-blue-600">Studio Portal</h1>
      {/* <Link to={"/teachers/"} className=" text-decoration-line: underline">
        Teacher Login and Registration
      </Link> */}
      <div className="flex justify-center m-10">
        <Login />
        <Register />
      </div>
    </div>
  );
};

export default LogReg;
