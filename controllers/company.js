const companyModel = require("../models/company");
const jwt = require("jsonwebtoken");

const getAllCompanies = async (_, res) => {
	try {
		const companies = await companyModel.getAllCompanies();
		res.status(200).json({
			message: "All companies fetched successfully",
			data: companies,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getCompanyById = async (req, res) => {
	try {
		const company = await companyModel.getCompanyById(req.params.id);
		if (!company) {
			return res.status(404).json({ message: "Company not found" });
		}
		res.status(200).json({
			message: "Company fetched successfully",
			data: company,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createCompany = async (req, res) => {
	try {
		const isExist = await companyModel.getCompanyByEmail(req.body.email);
		if (isExist)
			return res.status(400).json({
				message: "unvaild authentication",
			});
		const company = await companyModel.createCompany(req.body);
		const token = jwt.sign(
			{
				email: company.email,
				id: company._id,
				role: company.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "10h" }
		);
		res.header("auth-token", token);
		res.status(201).json({
			message: "Company created successfully",
			data: company,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateCompany = async (req, res) => {
	try {
		const company = await companyModel.updateCompany(req.params.id, req.body);
		if (!company) {
			return res.status(404).json({ message: "Company not found" });
		}
		const token = jwt.sign(
			{
				email: company.email,
				id: company._id,
				role: company.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "10h" }
		);
		res.header("auth-token", token);
		res.status(200).json({
			message: "Company updated successfully",
			data: company,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteCompany = async (req, res) => {
	try {
		const company = await companyModel.deleteCompany(req.params.id);
		if (!company) {
			return res.status(404).json({ message: "Company not found" });
		}
		res.status(200).json({
			message: "Company deleted successfully",
			data: company,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllCompanies,
	getCompanyById,
	createCompany,
	updateCompany,
	deleteCompany,
};
