require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const mongoose = require("mongoose");

const port = process.env.MY_PORT;
const mongoURI = process.env.MONGO_URI;

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config({ path: __dirname + "/.env" });
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: ["http://localhost:3000", "https://studio-portal-beryl.vercel.app"],
		credentials: true,
	})
);
app.use(cookieParser());

require("./routes/notes.routes")(app);
require("./routes/user.routes")(app);
require("./routes/youtube.routes")(app);

// require("./config/mongoose.config");\
mongoose
	.connect(mongoURI)
	.then(() => console.log(`You are connected to mongoDB`))
	.then(() => {
		app.listen(port, () => console.log(`Server connected on port ${port}`));
	})
	.catch((err) => console.log(err));

// app.listen(port, () => console.log(`Server connected on port ${port}`));

// static files (build of your frontend)
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client", "public")));
	app.get("/*", (req, res) => {
		res.sendFile(path.join(__dirname, "../client", "public", "index.html"));
	});
}
