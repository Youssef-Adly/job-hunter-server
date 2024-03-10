const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		userName: { type: String, required: true },
		amount: { type: Number, required: true },
		paymentDate: { type: Date, required: true },
	},
	{ versionKey: false }
);

module.exports = paymentSchema;
