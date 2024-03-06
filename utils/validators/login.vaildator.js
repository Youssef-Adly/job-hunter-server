const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const loginSchema = {
	type: "object",
	properties: {
		email: { type: "string", format: "email" },
		password: { type: "string", minLength: 8, maxLength: 20 },
		role: {
			type: "string",
			enum: ["admin", "employee", "company"],
		},
	},
	required: ["email", "password", "role"],
};

module.exports = ajv.compile(loginSchema);
