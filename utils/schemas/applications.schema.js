const mongoose = require("mongoose");

const applicationsSchema = new mongoose.Schema(
	{
		company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "company",
		},
		job: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "job",
		},
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		status: {
			type: String,
			enum: ["pending", "step1", "step2", "step3", "step4", "accepted", "rejected"],
			default: "pending",
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		process: {
			type: Object,
			default: {
				step1: { type: Object, default: {} },
				step2: { type: Object, default: {} },
				step3: { type: Object, default: {} },
				step4: { type: Object, default: {} },
			},
		},
	},
	{
		versionKey: false,
	}
);

module.exports = applicationsSchema;
