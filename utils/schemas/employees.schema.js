const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
	{
		userName: { type: String, required: true },
		password: {
			type: String,
			required: true,
		},
		birthDate: { type: Date, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		location: {
			city: { type: String, required: true },
			country: { type: String, required: true },
		},
		gender: {
			type: String,
			enum: ["male", "female"],
			required: true,
		},
		yearsOfExperience: { type: Number, required: true },
		typeOfJob: {
			type: String,
			enum: ["full-Time", "part-Time", "remote"],
			required: true,
		},
		workPlaceType: {
			type: String,
			enum: ["on-site", "remote", "hybrid"],
			required: true,
		},
		jobTitle: {
			type: String,
			enum: ["front-end", "back-end", "ui/ux"],
			required: true,
		},
		minimumSalary: { type: Number, required: true },
		graduationYear: { type: Number, required: true },
		educationLevel: {
			type: String,
			enum: ["high school", "bachelor", "master", "phd"],
			required: true,
		},
		grade: {
			type: String,
			enum: ["excellent", "very good", "good", "pass"],
			required: true,
		},
		skills: {
			type: [
				{
					skillName: { type: String, required: true },
					skillLevel: {
						type: String,
						enum: ["beginner", "intermediate", "advanced", "expert"],
						required: true,
					},
				},
			],
			required: true,
		},
		links: {
			type: {
				linkedIn: String,
				github: String,
				portfolio: String,
				website: String,
			},
			required: false,
		},
		role: {
			type: String,
			default: "employee",
			required: true,
		},
	},
	{ versionKey: false }
);

module.exports = employeeSchema;
