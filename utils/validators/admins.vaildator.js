const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const adminsSchema = {
	type: "object",
	properties: {
		userName: { type: "string", minLength: 3, maxLength: 20 },
		password: { type: "string", minLength: 8, maxLength: 20, pattern: "(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$" },
		email: { type: "string", format: "email" },
		role: { type: "string", enum: ["admin"] },
	},
	required: ["userName", "password", "email", "role"],
};

module.exports = ajv.compile(adminsSchema);
