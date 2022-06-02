import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1 className="">Error! Page Not Found</h1>
      <h2>
        Return to <Link to="/">Login </Link>page
      </h2>
    </div>
  );
};

export default ErrorPage;
