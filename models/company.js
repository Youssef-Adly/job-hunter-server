const companyVaildator = require("../utils/validators/company.vaildator");
const { companyModel } = require("../utils/DB");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const getAllCompanies = async (page, pageSize) => {
	const companies = await companyModel
		.find()
		.skip((page - 1) * pageSize)
		.limit(pageSize);
	return companies;
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

const patchCompany = async (id, company) => {
	const exist = await companyModel.findById({ _id: id });
	if (!exist) throw new Error("Company not found");

	const mergedCompany = _.mergeWith({}, exist.toObject(), company, (objValue, srcValue) => {
		if (_.isArray(objValue)) return srcValue;
	});

	if (company.password) {
		const salt = await bcrypt.genSalt(10);
		mergedCompany.password = await bcrypt.hash(company.password, salt);
	}

	return await companyModel.findByIdAndUpdate({ _id: id }, mergedCompany, { new: true });
};

const deleteCompany = async id => {
	return await companyModel.findByIdAndDelete;
};

module.exports = {
	getAllCompanies,
	getCompanyById,
	createCompany,
	updateCompany,
	patchCompany,
	deleteCompany,
	getCompanyByEmail,
};
