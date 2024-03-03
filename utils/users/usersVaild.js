const Ajv = require("ajv"),
	ajv = new Ajv();

const userSchema = {
	type: "object",
	properties: {
		name: { type: "string" },
		email: { type: "string" },
		password: { type: "string" },
	},
	required: ["name", "email", "password"],
	additionalProperties: false,
};

module.exports = ajv.compile(userSchema);
