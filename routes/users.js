const express = require("express"),
	router = express.Router(),
	Users = require("../controllers/users");

router.get("/", Users.getAllUsers);

module.exports = router;
