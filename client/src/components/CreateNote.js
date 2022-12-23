import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoteForm from "./NoteForm";
import { URL } from "../App";

const CreateNote = ({ loggedInUser, studentList }) => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});

	useEffect(() => {
		axios
			.get(`${URL}/api/users`, { withCredentials: true })
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
				navigate("/");
			});
	}, []);

	const addNote = (noteParam) => {
		console.log({
			noteParam,
		});
		axios
			.post(
				`${URL}/api/notes`,

				noteParam,

				{ withCredentials: true }
			)
			.then((res) => {
				console.log("success", res);
				setErrors({});
				navigate(`/students/${noteParam.student}`);
			})
			.catch((err) => {
				console.log("errors", err.response.data.errors);
				setErrors(err.response.data.errors);
			});
	};

	return (
		<div>
			<NoteForm
				onSubmitProp={addNote}
				initialStudent=""
				initialDescription=""
				initialVideo=""
				initialDate=""
				studentList={studentList}
				teacher={loggedInUser}
				errors={errors}
			/>
		</div>
	);
};

export default CreateNote;
