const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
	{
		company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "company",
		},
		title: {
			type: String,
			required: true,
		},
		info: {
			description: {
				type: String,
				required: true,
			},
			responsibilities: {
				type: String,
				required: true,
			},
		},
		category: {
			type: String,
			enum: ["front-end", "back-end", "full-stack"],
			required: true,
		},
		jobType: {
			type: String,
			enum: ["full-Time", "part-Time", "freelance"],
			required: true,
		},
		place: {
			type: String,
			enum: ["on-site", "remote", "hybrid"],
			required: true,
		},
		salary: {
			type: Number,
			required: true,
		},
		skills: {
			type: [String],
			required: true,
		},
		experience: {
			type: Number,
			required: true,
		},
		education: {
			type: String,
			enum: ["high school", "bachelor", "master", "phd"],
			required: true,
		},
		grade: {
			type: String,
			enum: ["excellent", "very good", "good", "pass"],
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		status: {
			type: String,
			enum: ["active", "rejected", "pending"],
			default: "pending",
		},
		image: {
			type: String,
			required: false,
		},
		mathcings: {
			type: [Object],
			required: false,
		},
	},
	{
		versionKey: false,
	}
);

module.exports = jobSchema;
