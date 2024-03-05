const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
	{
		company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "company",
		},
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		rating: {
			type: Number,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		versionKey: false,
	}
);

module.exports = reviewsSchema;
