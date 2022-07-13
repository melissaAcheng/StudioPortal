import React from "react";
import { Link } from "react-router-dom";

const LogReg = ({ heading, paragraph, linkName, linkUrl = "#" }) => {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img src={require("../imgs/studioLogo1.png")} alt="logo" className="col-start-3 col-end-5 scale-100"></img>
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{heading}</h2>
      <p className="mt-2 text-center text-sm text-gray-600 mt-5">
        {paragraph}{" "}
        <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
          {linkName}
        </Link>
      </p>
    </div>
  );
};

export default LogReg;
