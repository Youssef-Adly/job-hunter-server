const mongoose = require("mongoose");

const employeeSchema = require("./schemas/employees.schema");
const adminSchema = require("./schemas/admins.schema");
const companySchema = require("./schemas/company.schema");
const jobSchema = require("./schemas/jobs.schema");
const applicationsSchema = require("./schemas/applications.schema");

mongoose.connect("mongodb://localhost:27017/job-hunter");

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

module.exports = {
	employeeModel,
	adminModel,
	companyModel,
	jobModel,
	applicationsModel,
};
