// const mongoose = require("mongoose");
// const dbName = process.env.DB_NAME;

// mongoose
//   .connect(`mongodb://localhost/${dbName}`, {
//     useNewURLParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log(`You are connected to the ${dbName} database`))
//   .catch((err) => console.log(err));


const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

mongoose
	.connect(`${mongoURI}`, {
		useNewURLParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log(`You are connected to the ${mongoURI} database`))
	.catch((err) => console.log(err));
