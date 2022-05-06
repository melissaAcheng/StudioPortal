const express = require("express");
const cors = require("cors");
const port = 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

require("./routes/teacher.routes")(app);
require("./routes/student.routes")(app);
require("./routes/notes.routes")(app);

require("./config/mongoose.config");

app.listen(port, () => console.log(`Server connected on port ${port}`));
