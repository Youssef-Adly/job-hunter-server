const express = require("express"),
	cros = require("cors"),
	bodyParser = require("body-parser"),
	app = express(),
	PORT = process.env.PORT || 8000;

const employeesRoutes = require("./routes/employees");

app.use(cros());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//#region routes
app.use("/api/employees", employeesRoutes);
// #endregion

app.listen(PORT, () => {
	console.log("Server is running on port 8000...");
	console.log((URL = `http://localhost:${PORT}`));
});
