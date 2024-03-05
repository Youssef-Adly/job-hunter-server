const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		address: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
		},
		foundedIn: {
			type: Date,
			required: true,
		},
		employeesNumber: {
			type: Number,
			required: true,
		},
		industry: {
			type: String,
			required: true,
		},
		contactInfo: {
			type: Object,
			properties: {
				phoneNumber: {
					type: String,
					required: true,
				},
				website: {
					type: String,
					required: true,
				},
			},
		},
		links: {
			type: Object,
			properties: {
				linkedIn: {
					type: String,
					required: false,
				},
				facebook: {
					type: String,
					required: false,
				},
				instagram: {
					type: String,
					required: false,
				},
			},
		},
	},
	{ versionKey: false }
);

module.exports = companySchema;
