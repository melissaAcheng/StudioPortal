import React from "react";
import StudentLogin from "../components/StudentLogin";
import StudentReg from "../components/StudentReg";
import { Link } from "react-router-dom";

const StudentLogReg = () => {
  return (
    <div className="flex flex-col h-screen">
      <h1 className="font-medium leading-tight text-5xl text-blue-600">Studio Portal</h1>
      <Link to={"/teachers/"} className=" text-decoration-line: underline">
        Teacher Login and Registration
      </Link>
      <div className="flex justify-center m-10">
        <StudentLogin />
        <StudentReg />
      </div>
    </div>
  );
};

export default StudentLogReg;
