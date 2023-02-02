import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeacherHome from "./components/TeacherHome";
import StudentProfile from "./components/StudentProfile";
import ViewNote from "./components/ViewNote";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Register from "./components/Register";

export const URL = process.env.REACT_APP_BACKEND_URL;

function App() {
	// const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);
	const [loggedInUser, setLoggedInUser] = useState([]);
	const [studentList, setStudentList] = useState([]);

	useEffect(() => {
		axios
			.get(`${URL}/api/users`, { withCredentials: true })
			.then((res) => {
				console.log(res.data);
				if (res.data != null) {
					setLoggedInUser(res.data);
					setStudentList(res.data.students);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="App">
			<BrowserRouter basename="/">
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/register" element={<Register />} />

					<Route element={<TeacherHome />} path="/teachers/home" />
					<Route element={<StudentProfile />} path="/students/:studentId" />
					<Route element={<CreateNote loggedInUser={loggedInUser} studentList={studentList} />} path="/notes/addNote" />
					<Route
						element={<EditNote loggedInUser={loggedInUser} studentList={studentList} />}
						path="/notes/edit/:noteId"
					/>
					<Route element={<ViewNote loggedInUser={loggedInUser} />} path="/notes/:noteId" />
					<Route element={<ErrorPage />} path="*" />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
