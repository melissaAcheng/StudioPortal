const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
	registerUser: (req, res) => {
		User.create(req.body)
			.then((user) => {
				const userToken = jwt.sign(
					{
						id: user._id,
					},
					process.env.JWT_SECRET
				);

				res.cookie("usertoken", userToken, process.env.JWT_SECRET).json({ msg: "success!", user: user });
			})
			.catch((err) => res.status(400).json(err));
	},

	loginUser: async (req, res) => {
		const user = await User.findOne({ email: req.body.email });
		// console.log(user.password);
		if (user === null) {
			return res.status(400).json({ message: "Email does not exist" });
		}

		const correctPassword = await bcrypt.compare(req.body.password, user.password);

		// console.log(req.body.password);
		console.log(correctPassword);

		if (!correctPassword) {
			return res.status(400).json({ message: "Password is incorrect" });
		}

		console.log("email password match");

		const userToken = jwt.sign(
			{
				id: user._id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				role: user.role,
				students: user.students,
			},
			process.env.JWT_SECRET
		);

		res
			.cookie("usertoken", userToken, process.env.JWT_SECRET, {
				expires: new Date(Date.now() + 90000000),
			})
			.json({
				msg: "You have successfully logged in!",
				userId: user._id,
				userRole: user.role,
			});
	},
	logoutUser: (req, res) => {
		console.log("logging out");
		res.clearCookie("usertoken");
		res.sendStatus(200);
		res.json({
			message: "You have successfully logged out",
		});
	},

	getLoggedInUser: (req, res) => {
		const decodedJWT = jwt.decode(req.cookies.usertoken, {
			complete: true,
		});

		console.log("jwtdebugger", decodedJWT);

		User.findOne({
			_id: decodedJWT.payload.id,
		})
			.populate("students", "firstName lastName")
			.then((user) => {
				console.log(user);
				res.json(user);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	getOneUser: (req, res) => {
		User.findOne({ _id: req.params.id })
			.then((oneUser) => {
				console.log("getOneUser success");
				console.log(oneUser);
				res.json(oneUser);
			})
			.catch((err) => {
				console.log("getOneUser failed");
				console.log(err);
				res.json(err);
			});
	},
	getAllUsers: (req, res) => {
		User.find()
			.then((allUsers) => {
				console.log("getAllUsers success");
				console.log(allUsers);
				res.json(allUsers);
			})
			.catch((err) => {
				console.log("getAllUsers failed");
				console.log(err);
				res.json(err);
			});
	},
	getAllStudents: (req, res) => {
		User.find({ role: "student" })
			.then((allStudents) => {
				console.log("getAllStudents success");
				console.log(allStudents);
				res.json(allStudents);
			})
			.catch((err) => {
				console.log("getAllStudents failed");
				console.log(err);
				res.json(err);
			});
	},
	updateOneUser: (req, res) => {
		const decodedJWT = jwt.decode(req.cookies.usertoken, {
			complete: true,
		});
		User.findOneAndUpdate({ _id: decodedJWT.payload.id }, req.body, { new: true, runValidators: true })
			.then((updatedUser) => {
				console.log("updateOneUser success");
				console.log(updatedUser);
				res.json(updatedUser);
			})
			.catch((err) => {
				console.log("updateUser failed");
				console.log(err);
				res.status(400).json(err);
			});
	},
	deleteOneUser: (req, res) => {
		User.deleteOne({ _id: req.params.id })
			.then((deletedUser) => {
				console.log("deleteOneUser success");
				console.log(deletedUser);
				res.json(deletedUser);
			})
			.catch((err) => {
				console.log("deleteOneUser failed");
				console.log(err);
				res.json(err);
			});
	},
};
