const reviewValidator = require("../utils/validators/review.vaildator");
const { reviewsModel } = require("../utils/DB");

const getAllReviews = async () => {
	return await reviewsModel.find();
};

const getReviewById = async id => {
	return await reviewsModel.findById({ _id: id });
};

const getReviewsByCompany = async company => {
	return await reviewsModel.find({ company });
};

const getReviewsByEmployee = async employee => {
	return await reviewsModel.find({ employee });
};

const addReview = async review => {
	isValid = reviewValidator(review);
	if (isValid) {
		await reviewsModel.create(review);
		return review;
	} else throw new Error("Invalid review data");
};

const updateReview = async (id, review) => {
	isValid = reviewValidator(review);
	if (isValid) {
		await reviewsModel.findByIdAndUpdate({ _id: id }, review);
		return review;
	} else throw new Error("Invalid review data");
};

const deleteReview = async id => {
	return await reviewsModel.findByIdAndDelete({ _id: id });
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
