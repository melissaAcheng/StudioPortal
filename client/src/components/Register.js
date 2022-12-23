import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogReg from "../views/LogReg";
import { URL } from "../App";

const Register = () => {
	const navigate = useNavigate();
	const [confirmReg, setConfirmReg] = useState("");
	const [errors, setErrors] = useState({});

	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: "",
	});

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const register = (e) => {
		e.preventDefault();

		axios
			.post(`${URL}/api/users/register`, user, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data);
				setUser({
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					confirmPassword: "",
					role: "",
				});
				// setConfirmReg("Thank you for registering. Please log in with your credentials");
				setErrors({});
				if (res.data.user.role === "teacher") {
					navigate("/teachers/home");
				} else {
					navigate(`/students/${res.data.user._id}`);
				}
			})
			.catch((err) => {
				console.log(err);
				setErrors(err.response.data.errors);
			});
	};

	return (
		<div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-stone-300">
			<div className="w-full max-w-md m-auto bg-white rounded-lg py-10 px-16">
				<LogReg heading="Register" paragraph="Already have an account?" linkName="Login" linkUrl="/" />
				{/* <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">Register</h1> */}
				{confirmReg ? <h4>{confirmReg}</h4> : null}
				<form onSubmit={register}>
					<div>
						{errors.role ? <p className="text-red-400">{errors.role.message}</p> : null}
						<select
							name="role"
							value={user.role}
							onChange={(e) => handleChange(e)}
							className="text-black border font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center mb-2"
						>
							<option>Please select an option</option>
							<option>teacher</option>
							<option>student</option>
						</select>
					</div>
					<div>
						{/* <label>First Name</label> */}
						{errors.firstName ? <p className="text-red-400">{errors.firstName.message}</p> : null}
						<input
							type="text"
							name="firstName"
							value={user.firstName}
							onChange={(e) => handleChange(e)}
							className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
							placeholder="First Name"
						></input>
					</div>
					<div>
						{/* <label>Last Name</label> */}
						{errors.lastName ? <p className="text-red-400">{errors.lastName.message}</p> : null}
						<input
							type="text"
							name="lastName"
							value={user.lastName}
							onChange={(e) => handleChange(e)}
							className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
							placeholder="Last Name"
						></input>
					</div>
					<div>
						{/* <label>Email</label> */}
						{errors.email ? <p className="text-red-400">{errors.email.message}</p> : null}
						<input
							type="text"
							name="email"
							value={user.email}
							onChange={(e) => handleChange(e)}
							className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
							placeholder="Email"
						></input>
					</div>
					<div>
						{/* <label>Password</label> */}
						{errors.password ? <p className="text-red-400">{errors.password.message}</p> : null}
						<input
							type="password"
							name="password"
							value={user.password}
							onChange={(e) => handleChange(e)}
							className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
							placeholder="Password"
						></input>
					</div>
					<div>
						{/* <label>Confirm Password</label> */}
						{errors.confirmPassword ? <p className="text-red-400">{errors.confirmPassword.message}</p> : null}
						<input
							type="password"
							name="confirmPassword"
							value={user.confirmPassword}
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

export default Register;
