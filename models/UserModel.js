// models/UserModel.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	friends: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	}],
});

// Hash the password before saving the user to the database
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		return next(error);
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
