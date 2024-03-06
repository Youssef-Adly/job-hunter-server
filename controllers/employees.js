const employeesModel = require("../models/employees");
const jwt = require("jsonwebtoken");

const getAllEmployees = async (_, res) => {
	try {
		const employees = await employeesModel.getAllEmployees();
		res.status(200).json({
			message: "All employees fetched successfully",
			data: employees,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getEmployeeById = async (req, res) => {
	try {
		const employee = await employeesModel.getEmployeeById(req.params.id);
		if (!employee) {
			return res.status(404).json({ message: "Employee not found" });
		}
		res.status(200).json({
			message: "Employee fetched successfully",
			data: employee,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createEmployee = async (req, res) => {
	try {
		const isExist = await employeesModel.getEmployeeByEmail(req.body.email);
		if (isExist)
			return res.status(400).json({
				message: "unvaild authentication",
			});
		const employee = await employeesModel.createEmployee(req.body);
		const token = jwt.sign(
			{
				email: employee.email,
				id: employee._id,
				role: employee.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "10h" }
		);
		res.header("auth-token", token);
		res.status(201).json({
			message: "Employee created successfully",
			data: employee,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateEmployee = async (req, res) => {
	try {
		const employee = await employeesModel.updateEmployee(req.params.id, req.body);
		if (!employee) {
			return res.status(404).json({ message: "Employee not found" });
		}
		const token = jwt.sign(
			{
				email: employee.email,
				id: employee._id,
				role: employee.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "10h" }
		);
		res.header("auth-token", token);
		res.status(200).json({
			message: "Employee updated successfully",
			data: employee,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteEmployee = async (req, res) => {
	try {
		const employee = await employeesModel.deleteEmployee(req.params.id);
		if (!employee) {
			return res.status(404).json({ message: "Employee not found" });
		}
		res.status(200).json({
			message: "Employee deleted successfully",
			data: employee,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllEmployees,
	getEmployeeById,
	createEmployee,
	updateEmployee,
	deleteEmployee,
};
