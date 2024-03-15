const jobModel = require("../models/jobs");

const getAllJobs = async (req, res) => {
	const page = parseInt(req.query.page) || 1,
		pageSize = parseInt(req.query.pageSize) || 10;
	try {
		const jobs = await jobModel.getAllJobs(page, pageSize);
		res.status(200).json({
			message: "All jobs fetched successfully",
			data: jobs,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getJobById = async (req, res) => {
	try {
		const job = await jobModel.getJobById(req.params.id);
		if (!job) {
			return res.status(404).json({ message: "Job not found" });
		}
		res.status(200).json({
			message: "Job fetched successfully",
			data: job,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getJobByCompany = async (req, res) => {
	try {
		const jobs = await jobModel.getJobByCompany(req.params.company);
		if (!jobs) {
			return res.status(404).json({ message: "Jobs not found" });
		}
		res.status(200).json({
			message: "Jobs fetched successfully",
			data: jobs,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createJob = async (req, res) => {
	try {
		const job = await jobModel.createJob(req.body);
		res.status(201).json({
			message: "Job created successfully",
			data: job,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateJob = async (req, res) => {
	try {
		const job = await jobModel.updateJob(req.params.id, req.body);
		if (!job) {
			return res.status(404).json({ message: "Job not found" });
		}
		res.status(200).json({
			message: "Job updated successfully",
			data: job,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const patchJob = async (req, res) => {
	try {
		const job = await jobModel.patchJob(req.params.id, req.body);
		if (!job) {
			return res.status(404).json({ message: "Job not found" });
		}
		res.status(200).json({
			message: "Job updated successfully",
			data: job,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteJob = async (req, res) => {
	try {
		const job = await jobModel.deleteJob(req.params.id);
		if (!job) {
			return res.status(404).json({ message: "Job not found" });
		}
		res.status(200).json({
			message: "Job deleted successfully",
			data: job,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllJobs,
	getJobById,
	getJobByCompany,
	createJob,
	updateJob,
	patchJob,
	deleteJob,
};
