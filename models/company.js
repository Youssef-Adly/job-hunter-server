const companyVaildator = require("../utils/validators/company.vaildator");
const { companyModel } = require("../utils/DB");
const bcrypt = require("bcrypt");

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
		const salt = await bcrypt.genSalt(10);
		company.password = await bcrypt.hash(company.password, salt);
		await companyModel.create(company);
		return company;
	} else throw new Error("Invalid company data");
};

const updateCompany = async (id, company) => {
	isValid = companyVaildator(company);
	if (isValid) {
		const salt = await bcrypt.genSalt(10);
		company.password = await bcrypt.hash(company.password, salt);
		return await companyModel.findByIdAndUpdate({ _id: id }, company, {
			new: true,
		});
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
