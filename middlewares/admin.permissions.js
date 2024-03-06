const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) return res.status(401).send({ error: "Access Denied", message: "No token provided" });
	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		if (verified.role !== "admin") return res.status(403).send({ error: "Access Denied", message: "You are not an admin" });
		next();
	} catch (err) {
		res.status(400).send({ error: "Invalid Token", message: "Invalid Token" });
	}
};
