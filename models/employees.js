const employeeValidator = require("../utils/validators/exmployees.vaildator");
const { employeeModel } = require("../utils/DB");
const bcrypt = require("bcrypt");

const getAllEmployees = async () => {
	return await employeeModel.find();
};

const getEmployeeById = async id => {
	return await employeeModel.findById({ _id: id });
};

const getEmployeeByEmail = async email => {
	return await employeeModel.findOne({ email });
};

const createEmployee = async employee => {
	isValid = employeeValidator(employee);
	if (isValid) {
		const salt = await bcrypt.genSalt(10);
		employee.password = await bcrypt.hash(employee.password, salt);
		await employeeModel.create(employee);
		return employee;
	} else throw new Error("Invalid employee data");
};

const updateEmployee = async (id, employee) => {
	isValid = employeeValidator(employee);
	if (isValid) {
		const salt = await bcrypt.genSalt(10);
		employee.password = await bcrypt.hash(employee.password, salt);
		return await employeeModel.findByIdAndUpdate({ _id: id }, employee, {
			new: true,
		});
	} else throw new Error("Invalid employee data");
};

const deleteEmployee = async id => {
	return await employeeModel.findByIdAndDelete({ _id: id });
};

module.exports = {
	getAllEmployees,
	getEmployeeById,
	createEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployeeByEmail,
};
