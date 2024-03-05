const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const applicationsSchema = {
	type: "object",
	properties: {
		company: { type: "string" },
		employee: { type: "string" },
		job: { type: "string" },
		status: { type: "string", enum: ["pending", "step1", "step2", "step3", "step4", "accepted", "rejected"] },
	},
	required: ["employee", "job", "status"],
};

module.exports = ajv.compile(applicationsSchema);
