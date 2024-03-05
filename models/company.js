const companyVaildator = require("../utils/validators/company.vaildator");
const { companyModel } = require("../utils/DB");

const getAllCompanies = async () => {
	return await companyModel.find();
};

const getCompanyById = async id => {
	return await companyModel.findById({ _id: id });
};

const getCompanyByEmail = async email => {
	return await companyModel.findOne({ email });
};

const createCompany = async company => {
	isValid = companyVaildator(company);
	if (isValid) {
		await companyModel.create(company);
		return company;
	} else throw new Error("Invalid company data");
};

const updateCompany = async (id, company) => {
	isValid = companyVaildator(company);
	if (isValid) {
		await companyModel.findByIdAndUpdate({ _id: id }, company);
		return company;
	} else throw new Error("Invalid company data");
};

const deleteCompany = async id => {
	return await companyModel.findByIdAndDelete;
};

module.exports = {
	getAllCompanies,
	getCompanyById,
	createCompany,
	updateCompany,
	deleteCompany,
	getCompanyByEmail,
};
