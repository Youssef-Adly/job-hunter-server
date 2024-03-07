const mongoose = require("mongoose");

const employeeSchema = require("./schemas/employees.schema");
const adminSchema = require("./schemas/admins.schema");
const companySchema = require("./schemas/company.schema");
const jobSchema = require("./schemas/jobs.schema");
const applicationsSchema = require("./schemas/applications.schema");
const reviewsSchema = require("./schemas/reviews.schema");

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Connected to the job-hunter database");
});

const employeeModel = mongoose.model("employee", employeeSchema);
const adminModel = mongoose.model("admin", adminSchema);
const companyModel = mongoose.model("company", companySchema);
const jobModel = mongoose.model("job", jobSchema);
const applicationsModel = mongoose.model("application", applicationsSchema);
const reviewsModel = mongoose.model("review", reviewsSchema);

module.exports = {
	employeeModel,
	adminModel,
	companyModel,
	jobModel,
	applicationsModel,
	reviewsModel,
};
