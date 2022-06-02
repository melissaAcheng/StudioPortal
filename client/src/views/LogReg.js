import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { Link } from "react-router-dom";

const LogReg = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid grid-cols-6 p-5">
        <img src={require("../imgs/studioLogo1.png")} alt="logo" className="col-start-3 col-end-5 scale-50"></img>
      </div>

      {/* <Link to={"/teachers/"} className=" text-decoration-line: underline">
        Teacher Login and Registration
      </Link> */}
      <div className="relative flex flex-grow justify-center">
        <Login />
        <Register />
      </div>
    </div>
  );
};

export default LogReg;
