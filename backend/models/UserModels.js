const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please Enter your name"],
		
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please enter your password"],
		select: false,
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	role: {
		type: String,
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

//JWT TOKEN
userSchema.methods.getJWTTokens = function () {
	return jwt.sign({ id: this._id }, "nadfvcnsdcsvsdjvjsd", {
		expiresIn: process.env.EXPIRE_KEY,
	});
};

//Compare Passwoord
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};



module.exports = mongoose.model("User", userSchema);