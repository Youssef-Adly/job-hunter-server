const paymentValidator = require("../utils/validators/payment.vaildator");
const { paymentModel } = require("../utils/DB");

const getAllPayments = async (page, pageSize) => {
	const payments = await paymentModel
		.find()
		.skip((page - 1) * pageSize)
		.limit(pageSize);
	return payments;
};

const getPaymentById = async id => {
	return await paymentModel.findById({ _id: id });
};

const createPayment = async payment => {
	isValid = paymentValidator(payment);
	if (isValid) {
		await paymentModel.create(payment);
		return payment;
	} else throw new Error("Invalid payment data");
};

module.exports = {
	getAllPayments,
	getPaymentById,
	createPayment,
};
