const employeeValidator = require("../utils/validators/exmployees.vaildator");
const { employeeModel } = require("../utils/DB");
const bcrypt = require("bcrypt");
const _ = require("lodash");

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

const patchEmployee = async (id, employee) => {
	const exist = await employeeModel.findById({ _id: id });
	if (!exist) throw new Error("Employee not found");

	const mergedEmployee = _.mergeWith({}, exist.toObject(), employee, (objValue, srcValue) => {
		if (_.isArray(objValue)) return srcValue;
	});

	if (employee.password) {
		const salt = await bcrypt.genSalt(10);
		mergedEmployee.password = await bcrypt.hash(employee.password, salt);
	}

	return await employeeModel.findByIdAndUpdate({ _id: id }, mergedEmployee, { new: true });
};

const deleteEmployee = async id => {
	return await employeeModel.findByIdAndDelete({ _id: id });
};

module.exports = {
	getAllEmployees,
	getEmployeeById,
	createEmployee,
	updateEmployee,
	patchEmployee,
	deleteEmployee,
	getEmployeeByEmail,
};
