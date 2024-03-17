const jobModel = require("../models/jobs");
const employeeModel = require("../models/employees");

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
		const allEmployees = await employeeModel.getAllEmployees();
		const job = req.body;
		let mathcings = [];
		allEmployees.forEach(employee => {
			if (
				employee.jobTitle !== job.category ||
				employee.typeOfJob !== job.jobType ||
				employee.workPlaceType !== job.place ||
				employee.yearsOfExperience < job.experience
			)
				return;
			else {
				let allEmployeeSkills = employee.skills.map(skill => skill.skillName.toLowerCase());
				let matchingSkills = allEmployeeSkills.filter(skill => job.skills.includes(skill.toLowerCase()));
				const score = matchingSkills.length / job.skills.length;
				if (score == 0) return;
				mathcings.push({
					id: employee._id,
					name: employee.userName,
					email: employee.email,
					educationLevel: employee.educationLevel,
					graduationYear: employee.graduationYear,
					grade: employee.grade,
					image: employee.image,
					score,
					matchingSkills,
				});
			}
		});
		job.mathcings = mathcings;

		const createdJob = await jobModel.createJob(job);
		res.status(201).json({
			message: "Job created successfully",
			data: createdJob,
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
