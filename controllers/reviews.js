const reviewModel = require("../models/reviews");

const getAllReviews = async (_, res) => {
	try {
		const reviews = await reviewModel.getAllReviews();
		res.status(200).json({
			status: "success",
			message: "All reviews fetched successfully",
			data: reviews,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "Internal server error",
			error: error.message,
		});
	}
};

const getReviewById = async (req, res) => {
	try {
		const review = await reviewModel.getReviewById(req.params.id);
		if (!review) {
			return res.status(404).json({
				status: "error",
				message: "Review not found",
			});
		}
		res.status(200).json({
			status: "success",
			message: "Review fetched successfully",
			data: review,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "Internal server error",
			error: error.message,
		});
	}
};

const getReviewsByCompany = async (req, res) => {
	try {
		const reviews = await reviewModel.getReviewsByCompany(req.params.company);
		if (reviews.length === 0) {
			return res.status(404).json({
				status: "error",
				message: "No reviews found",
			});
		}
		res.status(200).json({
			status: "success",
			message: "Reviews fetched successfully",
			data: reviews,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "Internal server error",
			error: error.message,
		});
	}
};

const getReviewsByEmployee = async (req, res) => {
	try {
		const reviews = await reviewModel.getReviewsByEmployee(req.params.employee);
		if (reviews.length === 0) {
			return res.status(404).json({
				status: "error",
				message: "No reviews found",
			});
		}
		res.status(200).json({
			status: "success",
			message: "Reviews fetched successfully",
			data: reviews,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "Internal server error",
			error: error.message,
		});
	}
};

const addReview = async (req, res) => {
	try {
		const review = await reviewModel.addReview(req.body);
		res.status(201).json({
			status: "success",
			message: "Review added successfully",
			data: review,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "Internal server error",
			error: error.message,
		});
	}
};

const updateReview = async (req, res) => {
	try {
		const review = await reviewModel.updateReview(req.params.id, req.body);
		if (!review) {
			return res.status(404).json({
				status: "error",
				message: "Review not found",
			});
		}
		res.status(200).json({
			status: "success",
			message: "Review updated successfully",
			data: review,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "Internal server error",
			error: error.message,
		});
	}
};

const deleteReview = async (req, res) => {
	try {
		const review = await reviewModel.deleteReview(req.params.id);
		if (!review) {
			return res.status(404).json({
				status: "error",
				message: "Review not found",
			});
		}
		res.status(200).json({
			status: "success",
			message: "Review deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "Internal server error",
			error: error.message,
		});
	}
};

module.exports = {
	getAllReviews,
	getReviewById,
	getReviewsByCompany,
	getReviewsByEmployee,
	addReview,
	updateReview,
	deleteReview,
};
