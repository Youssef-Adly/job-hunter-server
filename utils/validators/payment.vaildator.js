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
		paymentDate: { type: "string", format: "date" },
	},
	required: ["userId", "userName", "amount", "paymentDate"],
};

module.exports = ajv.compile(paymentSchema);
