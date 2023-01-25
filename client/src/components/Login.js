import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogReg from "../views/LogReg";
import { URL } from "../App";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const login = (e) => {
		e.preventDefault();
		axios
			.post(
				`${URL}/api/users/login`,
				{
					email: email,
					password: password,
				},
				{
					withCredentials: true,
					credentials: "include",
				}
			)
			.then((res) => {
				console.log(res.data);
				// If user has a role of teacher -> navigate to view all teacher home page
				// If user has a role of student -> navigate to student profile page
				if (res.data.userRole === "teacher") {
					navigate("/teachers/home");
				} else {
					navigate(`/students/${res.data.userId}`);
				}
			})
			.catch((err) => {
				console.log(err.response.data);
				setErrorMessage(err.response.data.message);
			});
	};

	return (
		<div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-stone-300">
			<div className="w-full max-w-md m-auto bg-white rounded-lg py-10 px-16">
				<LogReg heading="Login" paragraph="Don't have an account yet?" linkName="Register" linkUrl="/register" />
				{/* <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">Login</h1> */}
				<form onSubmit={login}>
					<div>
						{/* <label>Email</label> */}
						<input
							type="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
							placeholder="Email"
						></input>
					</div>
					<div>
						{/* <label>Password</label> */}
						<input
							type="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
							placeholder="Password"
						></input>
					</div>
					<p className="text-red-400">{errorMessage ? errorMessage : ""}</p>
					<div className="flex justify-center items-center mt-6">
						<button
							className={`bg-gray-500 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
