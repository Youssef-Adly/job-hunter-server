const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
		userName: { type: String, required: true },
		amount: { type: Number, required: true },
		paymentDate: { type: Date, required: false, default: Date.now() },
	},
	{ versionKey: false }
);

module.exports = paymentSchema;
