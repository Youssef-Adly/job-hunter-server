const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const employeeSchema = {
	type: "object",
	properties: {
		userName: { type: "string", minLength: 3, maxLength: 20 },
		password: { type: "string", minLength: 8, maxLength: 20, pattern: "(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$" },
		birthDate: { type: "string", format: "date" },
		email: { type: "string", format: "email" },
		phone: { type: "string", pattern: "^[0-9]{11}$" },
		location: {
			type: "object",
			properties: {
				city: { type: "string" },
				country: { type: "string" },
			},
			required: ["city", "country"],
		},
		gender: { type: "string", enum: ["male", "female"] },
		yearsOfExperience: { type: "number", minimum: 0 },
		typeOfJob: { type: "string", enum: ["full-Time", "part-Time", "remote"] },
		workPlaceType: { type: "string", enum: ["on-site", "remote", "hybrid"] },
		jobTitle: { type: "string", enum: ["front-end", "back-end", "ui/ux"] },
		minimumSalary: { type: "number", minimum: 0 },
		graduationYear: { type: "number", minimum: 0 },
		educationLevel: { type: "string", enum: ["high school", "bachelor", "master", "phd"] },
		grade: { type: "string", enum: ["excellent", "very good", "good", "pass"] },
		skills: {
			type: "array",
			items: {
				type: "object",
				properties: {
					skillName: { type: "string" },
					skillLevel: { type: "string", enum: ["beginner", "intermediate", "advanced", "expert"] },
				},
				required: ["skillName", "skillLevel"],
			},
		},
		links: {
			type: "object",
			properties: {
				linkedIn: { type: "string", format: "uri" },
				github: { type: "string", format: "uri" },
			},
		},
		role: { type: "string", enum: ["employee"] },
	},
	required: [
		"userName",
		"password",
		"birthDate",
		"email",
		"phone",
		"location",
		"gender",
		"yearsOfExperience",
		"typeOfJob",
		"workPlaceType",
		"jobTitle",
		"minimumSalary",
		"graduationYear",
		"educationLevel",
		"grade",
		"skills",
		"role",
	],
};

module.exports = ajv.compile(employeeSchema);
