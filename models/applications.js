const applicationValidator = require("../utils/validators/applications.vaildator");
const { applicationsModel } = require("../utils/DB");

const getAllApplications = async (page, pageSize) => {
	return await applicationsModel
		.find()
		.skip((page - 1) * pageSize)
		.limit(pageSize);
};

const getApplicationById = async id => {
	return await applicationsModel.findById({ _id: id });
};

const getApplicationsByEmployee = async employee => {
	return await applicationsModel.find({ employee });
};

const getApplicationsByCompany = async company => {
	return await applicationsModel.find({ company });
};

const createApplication = async application => {
	isValid = applicationValidator(application);
	if (isValid) {
		await applicationsModel.create(application);
		return application;
	} else throw new Error("Invalid application data");
};

const updateApplication = async (id, application) => {
	isValid = applicationValidator(application);
	if (isValid) {
		await applicationsModel.findByIdAndUpdate({ _id: id }, application);
		return application;
	} else throw new Error("Invalid application data");
};

const deleteApplication = async id => {
	return await applicationsModel.findByIdAndDelete({ _id: id });
};

module.exports = {
	getAllApplications,
	getApplicationById,
	createApplication,
	updateApplication,
	deleteApplication,
	getApplicationsByEmployee,
	getApplicationsByCompany,
};
