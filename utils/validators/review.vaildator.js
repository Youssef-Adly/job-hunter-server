const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const reviewsSchema = {
	type: "object",
	properties: {
		company: { type: "string" },
		employee: { type: "string" },
		rating: { type: "number", minimum: 1, maximum: 5 },
		comment: { type: "string" },
		createdAt: { type: "string", format: "date-time" },
	},
	required: ["company", "employee", "rating", "comment"],
};

module.exports = ajv.compile(reviewsSchema);
