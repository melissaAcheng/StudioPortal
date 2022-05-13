import React from "react";
import TeacherReg from "../components/TeacherReg";
import TeacherLogin from "../components/TeacherLogin";
import { Link } from "react-router-dom";

const TeacherLogReg = () => {
  return (
    <div className="flex flex-col h-screen">
      <h1 className="font-medium leading-tight text-5xl text-blue-600">Studio Portal</h1>
      <Link to={"/students/"} className=" text-decoration-line: underline">
        Student Login and Registration
      </Link>
      <div className="flex justify-center m-10">
        <TeacherLogin />
        <TeacherReg />
      </div>
    </div>
  );
};

export default TeacherLogReg;
