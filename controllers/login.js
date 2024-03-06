const adminModel = require("../models/admins"),
	employeeModel = require("../models/employees"),
	companyModel = require("../models/company"),
	jwt = require("jsonwebtoken"),
	bcrypt = require("bcrypt"),
	loginValidator = require("../utils/validators/login.vaildator");

const login = async (req, res) => {
	const { email, password, role } = req.body;
	const valid = loginValidator({ email, password, role });
	if (!valid) return res.status(400).json({ message: "Invalid data" });
	try {
		let user;
		if (role === "admin") user = await adminModel.getAdminByEmail(email);
		else if (role === "employee") user = await employeeModel.getEmployeeByEmail(email);
		else if (role === "company") user = await companyModel.getCompanyByEmail(email);

		if (!user) return res.status(404).json({ status: "error", message: "unvaild authentication" });
		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(401).json({ status: "error", message: "Invalid authentication" });

		const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "10h" });
		res.header("auth-token", token).json({ status: "success", token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ status: "error", message: "Internal server error" });
	}
};

module.exports = { login };
