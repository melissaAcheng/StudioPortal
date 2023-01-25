const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
	{
		role: {
			type: String,
			required: [true, "Please select a role"],
			enum: ["teacher", "student"],
		},
		firstName: {
			type: String,
			required: [true, "First Name is required"],
		},
		lastName: {
			type: String,
			required: [true, "Last Name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			validate: {
				validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
				message: "Please enter a valid email",
			},
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minLength: [8, "Password must be at least 8 characters"],
		},
		students: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

UserSchema.virtual("confirmPassword")
	.get(() => this._confirmPassword)
	.set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
	if (this.password !== this.confirmPassword) {
		this.invalidate("confirmPassword", "Passwords do not match");
		console.log("Passwords don't match");
	}
	next();
});

UserSchema.pre("save", function (next) {
	console.log("in pre save");
	bcrypt.hash(this.password, 10).then((hashedPassword) => {
		this.password = hashedPassword;
		next();
	});
});

module.exports = mongoose.model("User", UserSchema);
