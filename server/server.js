// require("dotenv").config();

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config({ path: __dirname + "/.env" });
}

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");

const port = process.env.MY_PORT;
const mongoURI = process.env.MONGO_URI;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: ["https://studio-portal-app.vercel.app", "http://localhost:3000"],
		credentials: true,
		exposedHeaders: ["usertoken"],
	})
);
app.use(cookieParser());

// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Credentials", true);
// 	res.header(
// 		"Access-Control-Allow-Origin",
// 		process.env.NODE_ENV === "production" ? "https://studio-portal-beryl.vercel.app" : "http://localhost:3000"
// 	);
// 	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,UPDATE,OPTIONS");
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");

// 	next();
// });

// require("./config/mongoose.config");\
mongoose
	.connect(mongoURI)
	.then(() => console.log(`You are connected to mongoDB`))
	.then(() => {
		app.listen(port, () => console.log(`Server connected on port ${port}`));
	})
	.catch((err) => console.log(err));

// all your routes should go here
// app.use('/api/users/register', require(path.join(__dirname,'routes', 'user.routes.js')));
require("./routes/notes.routes")(app);
require("./routes/user.routes")(app);
require("./routes/youtube.routes")(app);

// app.listen(port, () => console.log(`Server connected on port ${port}`));

// static files (build of your frontend)
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client", "build")));
	app.get("/*", (req, res) => {
		res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
	});
}
