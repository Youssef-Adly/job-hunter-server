const employeeValidator = require("../utils/validators/exmployees.vaildator");
const { employeeModel } = require("../utils/DB");

const getAllEmployees = async () => {
	return await employeeModel.find();
};

const getEmployeeById = async id => {
	return await employeeModel.findById(id);
};

const getEmployeeByEmail = async email => {
	return await employeeModel.findOne({ email });
};

const createEmployee = async employee => {
	isValid = employeeValidator(employee);
	if (isValid) {
		await employeeModel.create(employee);
		return employee;
	} else throw new Error("Invalid employee data");
};

const updateEmployee = async (id, employee) => {
	isValid = employeeValidator(employee);
	if (isValid) {
		await employeeModel.findByIdAndUpdate(id, employee);
		return employee;
	} else throw new Error("Invalid employee data");
};

const deleteEmployee = async id => {
	return await employeeModel.findByIdAndDelete(id);
};

module.exports = {
	getAllEmployees,
	getEmployeeById,
	createEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployeeByEmail,
};
