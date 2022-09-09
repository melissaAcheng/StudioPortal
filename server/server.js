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

// eventually move this over to controller and routes to get input from user
// app.get("/api/videos", async (req, res) => {
//   try {
//     const searchQuery = req.query.search_query;
//     console.log(searchQuery);
//     const url = `${baseApiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`;
//     const response = await axios.get(url);
//     // const titles = response.data.items.map((item) => item.snippet.title);
//     const ids = response.data.items.map((item) => item.id.videoId);
//     res.send(ids);
//   } catch (err) {
//     res.json(err);
//     // next(err);
//   }
// });

require("./routes/notes.routes")(app);
require("./routes/user.routes")(app);
require("./routes/youtube.routes")(app);

require("./config/mongoose.config");

app.listen(port, () => console.log(`Server connected on port ${port}`));
