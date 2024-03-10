const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment");

router.get("/", paymentController.getAllPayments);
router.get("/:id", paymentController.getPaymentById);
router.post("/config", paymentController.config);
router.post("/checkout", paymentController.checkout);

module.exports = router;
