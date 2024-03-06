const adminModel = require("../models/admins");
const jwt = require("jsonwebtoken");

const getAllAdmins = async (_, res) => {
	try {
		const admins = await adminModel.getAllAdmins();
		res.status(200).json({
			message: "All admins fetched successfully",
			data: admins,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getAdminById = async (req, res) => {
	try {
		const admin = await adminModel.getAdminById(req.params.id);
		if (!admin) {
			return res.status(404).json({ message: "Admin not found" });
		}
		res.status(200).json({
			message: "Admin fetched successfully",
			data: admin,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createAdmin = async (req, res) => {
	try {
		const isExist = await adminModel.getAdminByEmail(req.body.email);
		if (isExist)
			return res.status(400).json({
				message: "unvaild authentication",
			});
		const admin = await adminModel.createAdmin(req.body);
		const token = jwt.sign(
			{
				email: admin.email,
				id: admin._id,
				role: admin.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "10h" }
		);
		res.header("auth-token", token);
		res.status(201).json({
			message: "Admin created successfully",
			data: admin,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateAdmin = async (req, res) => {
	try {
		const admin = await adminModel.updateAdmin(req.params.id, req.body);
		if (!admin) {
			return res.status(404).json({ message: "Admin not found" });
		}
		const token = jwt.sign(
			{
				email: admin.email,
				id: admin._id,
				role: admin.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "10h" }
		);
		res.header("auth-token", token);
		res.status(200).json({
			message: "Admin updated successfully",
			data: admin,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteAdmin = async (req, res) => {
	try {
		const admin = await adminModel.deleteAdmin(req.params.id);
		if (!admin) {
			return res.status(404).json({ message: "Admin not found" });
		}
		res.status(200).json({
			message: "Admin deleted successfully",
			data: admin,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllAdmins,
	getAdminById,
	createAdmin,
	updateAdmin,
	deleteAdmin,
};
