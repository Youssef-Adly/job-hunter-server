const mongoose = require("mongoose");
const employeeSchema = require("./schemas/employees.schema");
const adminSchema = require("./schemas/admins.schema");

mongoose.connect("mongodb://localhost:27017/job-hunter");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Connected to the job-hunter database");
});

const employeeModel = mongoose.model("employee", employeeSchema);
const adminModel = mongoose.model("admin", adminSchema);

module.exports = {
	employeeModel,
	adminModel,
};
