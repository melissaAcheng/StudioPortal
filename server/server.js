require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const port = process.env.MY_PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(cookieParser());

require("./routes/notes.routes")(app);
require("./routes/user.routes")(app);
require("./routes/youtube.routes")(app);

require("./config/mongoose.config");

app.listen(port, () => console.log(`Server connected on port ${port}`));
