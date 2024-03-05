const express = require("express"),
	cros = require("cors"),
	bodyParser = require("body-parser"),
	app = express(),
	PORT = process.env.PORT || 8000;

const employeesRoutes = require("./routes/employees");
const adminRoutes = require("./routes/admins");
const companyRoutes = require("./routes/company");

app.use(cros());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//#region routes
app.use("/api/employees", employeesRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/companies", companyRoutes);
// #endregion

app.listen(PORT, () => {
	console.log("Server is running on port 8000...");
	console.log((URL = `http://localhost:${PORT}`));
});
