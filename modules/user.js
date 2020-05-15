var mongoose			  = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: {type: String, unique: true, required: true},
	password: String,
	firstName: String,
	lastName: String,
	email: {type: String, unique: true, required: true},
	avatar: String,
	isAdmin: {type: Boolean, default: false},
	resetPasswordToken: String,
	resetPasswordExpires: Date
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);