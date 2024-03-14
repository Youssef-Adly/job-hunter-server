const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const paymentSchema = {
	type: "object",
	properties: {
		userId: { type: "string" },
		userName: { type: "string" },
		amount: { type: "number" },
	},
	required: ["userId", "userName", "amount"],
};

module.exports = ajv.compile(paymentSchema);
