import React, { useState } from "react";
import axios from "axios";

const StudentReg = () => {
  const [confirmReg, setConfirmReg] = useState("");
  const [errors, setErrors] = useState({});

  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/students/register", student, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setStudent({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setConfirmReg("Thank you for registering. Please log in with your credentials");
        setErrors({});
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="ml-5">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">Student Registration</h1>
        {confirmReg ? <h4>{confirmReg}</h4> : null}
        <form onSubmit={register}>
          <div>
            <label>First Name</label>
            {errors.firstName ? <p className="text-red-400">{errors.firstName.message}</p> : null}
            <input
              type="text"
              name="firstName"
              value={student.firstName}
              onChange={(e) => handleChange(e)}
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              placeholder="First Name"
            ></input>
          </div>
          <div>
            <label>Last Name</label>
            {errors.lastName ? <p className="text-red-400">{errors.lastName.message}</p> : null}
            <input
              type="text"
              name="lastName"
              value={student.lastName}
              onChange={(e) => handleChange(e)}
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              placeholder="Last Name"
            ></input>
          </div>
          <div>
            <label>Email</label>
            {errors.email ? <p className="text-red-400">{errors.email.message}</p> : null}
            <input
              type="text"
              name="email"
              value={student.email}
              onChange={(e) => handleChange(e)}
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              placeholder="Email"
            ></input>
          </div>
          <div>
            <label>Password</label>
            {errors.password ? <p className="text-red-400">{errors.password.message}</p> : null}
            <input
              type="password"
              name="password"
              value={student.password}
              onChange={(e) => handleChange(e)}
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              placeholder="Password"
            ></input>
          </div>
          <div>
            <label>Confirm Password</label>
            {errors.confirmPassword ? <p className="text-red-400">{errors.confirmPassword.message}</p> : null}
            <input
              type="password"
              name="confirmPassword"
              value={student.confirmPassword}
              onChange={(e) => handleChange(e)}
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              placeholder="Confirm Password"
            ></input>
          </div>
          <div>
            <button
              className={`bg-gray-500 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentReg;
