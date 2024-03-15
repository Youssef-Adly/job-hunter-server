const paymentModel = require("../models/payment");
const companyModel = require("../models/company");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getAllPayments = async (req, res) => {
	const page = parseInt(req.query.page) || 1,
		pageSize = parseInt(req.query.pageSize) || 10;
	try {
		const payments = await paymentModel.getAllPayments(page, pageSize);
		res.status(200).json({
			message: "All payments fetched successfully",
			data: payments,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getPaymentById = async (req, res) => {
	try {
		const payment = await paymentModel.getPaymentById(req.params.id);
		res.status(200).json({
			message: `Payment with id ${req.params.id}`,
			data: payment,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const config = (req, res) => {
	res.status(200).json({
		message: "Stripe configuration",
		data: process.env.STRIPE_SECRET_KEY,
	});
};

const checkout = async (req, res) => {
	try {
		const { amount, user } = req.body;
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "usd",
			description: `Payment for ${user.name} in job-hunter`,
			confirm: true,
			payment_method: "pm_card_visa",
			return_url: "http://localhost:3000/landing",
		});
		if (payment.status === "succeeded") {
			const newPayment = {
				userId: user._id,
				userName: user.name,
				amount: payment.amount,
			};
			await paymentModel.createPayment(newPayment);
			// Update company balance
			const company = await companyModel.getCompanyById(user._id);
			await companyModel.patchCompany(user._id, {
				avilableJobs: company.avilableJobs + payment.amount == 99 ? 3 : 20,
			});
			res.status(200).json({ message: "Payment successful", payment });
		} else res.status(400).json({ message: "Payment failed", payment });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	config,
	checkout,
	getAllPayments,
	getPaymentById,
};
