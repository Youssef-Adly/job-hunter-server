const mongoose = require("mongoose");

const adminsSchema = new mongoose.Schema(
	{
		userName: { type: String, required: true, unique: true },
		password: {
			type: String,
			required: true,
		},
		email: { type: String, required: true },
		role: { type: String, enum: ["admin"], required: true },
	},
	{ versionKey: false }
);

module.exports = adminsSchema;
