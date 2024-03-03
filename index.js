const express = require("express"),
	bodyParser = require("body-parser"),
	app = express(),
	PORT = process.env.PORT || 8000;

const UsersRouter = require("./routes/users");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//#region routes
app.get("/api/users", UsersRouter);
// #endregion

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
