const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const jobsSchema = {
	type: "object",
	properties: {
		company: { type: "string" },
		title: { type: "string" },
		info: {
			type: "object",
			properties: {
				description: { type: "string" },
				responsibilities: { type: "string" },
			},
			required: ["description", "responsibilities"],
		},
		category: { type: "string", enum: ["front-end", "back-end", "full-stack"] },
		jobType: { type: "string", enum: ["full-Time", "part-Time", "remote"] },
		place: { type: "string", enum: ["on-site", "remote", "hybrid"] },
		salary: { type: "number", minimum: 0 },
		skills: {
			type: "array",
			items: {
				type: "string",
			},
		},
		experience: { type: "number", minimum: 0 },
		education: { type: "string", enum: ["high school", "bachelor", "master", "phd"] },
		grade: { type: "string", enum: ["excellent", "very good", "good", "pass"] },
		createdAt: { type: "string", format: "date-time" },
		isVerfied: { type: "boolean" },
	},
	required: [
		"company",
		"title",
		"info",
		"category",
		"jobType",
		"place",
		"salary",
		"skills",
		"experience",
		"education",
		"grade",
		"isVerfied",
	],
};

module.exports = ajv.compile(jobsSchema);
