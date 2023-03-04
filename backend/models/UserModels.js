const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please Enter your name"],
		
	},
	username: {
		type: String,
		required: [true, "Please Enter your Username"],
		
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
			default  : "1234",
			
		},
		url: {
			type: String,
			default: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
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
	flights : [
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Flight"
		}
	],
	tourPackage : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : "Tour"
		}
	]
	
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
		expiresIn: "30d",
	});
};

//Compare Passwoord
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};



module.exports = mongoose.model("User", userSchema);