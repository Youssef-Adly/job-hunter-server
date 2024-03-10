const paymentModel = require("../models/payment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getAllPayments = async (req, res) => {
	try {
		const payments = await paymentModel.getAllPayments();
		res.status(200).json({
			message: "All payments",
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
		data: process.env.STRIPE_PUBLISHABLE_KEY,
	});
};

const checkout = async (req, res) => {
	try {
		const { amount, id, currency } = req.body;
		const payment = await stripe.paymentIntents.create({
			amount,
			currency,
			description: `Payment for ${req.user.name} in job-hunter`,
			payment_method: id,
			confirm: true,
			return_url: "http://localhost:3000/success",
		});
		if (payment.status === "succeeded") {
			const newPayment = {
				userId: req.user._id,
				userName: req.user.name,
				amount: payment.amount / 100,
				paymentDate: new Date(),
			};
			await paymentModel.createPayment(newPayment);
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
