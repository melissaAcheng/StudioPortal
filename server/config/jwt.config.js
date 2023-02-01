const jwt = require("jsonwebtoken");

module.exports = {
	authenticate(req, res, next) {
		// const authHeader = req.headers["authorization"];
		// const token = authHeader && authHeader.split(" ")[1];
		// console.log("token", token);

		// if (token === undefined) {
		// 	console.log("NO TOKEN FOUND");
		// 	return res.sendStatus(401);
		// }

		// let token = req.cookies.usertoken;
		// token = token["Authorization"];
		// console.log("TOKEN", token);

		jwt.verify(req.cookies.usertoken, process.env.JWT_SECRET, (err, payload) => {
			if (err) {
				console.log(err);
				res.status(401).json({ verified: false });
			} else {
				console.log(payload);
				req.jwtpayload = payload;

				next();
			}
		});
	},
};
