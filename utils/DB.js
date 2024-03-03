const mongoose = require("mongoose");
const userSchema = require("./users/usersSchema");

mongoose.connect("mongodb://localhost:27017/job-hunter");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Connected to the users database");
});

const userModel = mongoose.model("users", userSchema);

module.exports = {
	userModel,
};
