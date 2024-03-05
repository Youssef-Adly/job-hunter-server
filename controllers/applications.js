const applicationsModel = require("../models/applications");

const getAllApplications = async (_, res) => {
	try {
		const applications = await applicationsModel.getAllApplications();
		res.status(200).json({
			message: "All applications fetched successfully",
			data: applications,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getApplicationById = async (req, res) => {
	try {
		const application = await applicationsModel.getApplicationById(req.params.id);
		if (!application) {
			return res.status(404).json({ message: "Application not found" });
		}
		res.status(200).json({
			message: "Application fetched successfully",
			data: application,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getApplicationsByEmployee = async (req, res) => {
	try {
		const applications = await applicationsModel.getApplicationsByEmployee(req.params.employee);
		if (!applications) {
			return res.status(404).json({ message: "Applications not found" });
		}
		res.status(200).json({
			message: "Applications fetched successfully",
			data: applications,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getApplicationsByCompany = async (req, res) => {
	try {
		const applications = await applicationsModel.getApplicationsByCompany(req.params.company);
		if (!applications) {
			return res.status(404).json({ message: "Applications not found" });
		}
		res.status(200).json({
			message: "Applications fetched successfully",
			data: applications,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createApplication = async (req, res) => {
	try {
		const application = await applicationsModel.createApplication(req.body);
		res.status(201).json({
			message: "Application created successfully",
			data: application,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateApplication = async (req, res) => {
	try {
		const application = await applicationsModel.updateApplication(req.params.id, req.body);
		if (!application) {
			return res.status(404).json({ message: "Application not found" });
		}
		res.status(200).json({
			message: "Application updated successfully",
			data: application,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteApplication = async (req, res) => {
	try {
		const application = await applicationsModel.deleteApplication(req.params.id);
		if (!application) {
			return res.status(404).json({ message: "Application not found" });
		}
		res.status(200).json({
			message: "Application deleted successfully",
			data: application,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllApplications,
	getApplicationById,
	getApplicationsByEmployee,
	getApplicationsByCompany,
	createApplication,
	updateApplication,
	deleteApplication,
};
