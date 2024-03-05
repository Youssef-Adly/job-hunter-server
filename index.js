const express = require("express"),
	cros = require("cors"),
	bodyParser = require("body-parser"),
	app = express(),
	PORT = process.env.PORT || 8000;

const employeesRoutes = require("./routes/employees");
const adminsRoutes = require("./routes/admins");
const companyRoutes = require("./routes/company");
const jobsRoutes = require("./routes/jobs");
const applicationsRoutes = require("./routes/applications");

app.use(cros());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//#region routes
app.use("/api/employees", employeesRoutes);
app.use("/api/admins", adminsRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/applications", applicationsRoutes);
// #endregion

app.listen(PORT, () => {
	console.log("Server is running on port 8000...");
	console.log((URL = `http://localhost:${PORT}`));
});
