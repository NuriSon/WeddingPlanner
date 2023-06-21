const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
	name: {
		first: {
			type: String,
			trim: true,
		},
		last: {
			type: String,
			trim: true,
		},
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	zipCode: {
		type: Number,
		min: [1000, "Zip code too short"],
		max: 99999,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.virtual("fullName").get(function () {
	return `${this.name.first} ${this.name.last}`;
});

userSchema.plugin(passportLocalMongoose, {
	usernameField: "email",
});

userSchema.pre("save", function (next) {
	let user = this;
	bcrypt
		.hash(user.password, 10)
		.then((hash) => {
			user.password = hash;
			next();
		})
		.catch((error) => {
			console.log(`Error in hashing password: ${error.message}`);
			next(error);
		});
});
userSchema.methods.passwordComparison = function (inputPassword) {
	let user = this;
	return bcrypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model("User", userSchema);
