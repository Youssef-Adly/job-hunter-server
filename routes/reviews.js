const express = require("express");
const router = express.Router();
const review = require("../controllers/reviews");

router.get("/", review.getAllReviews);
router.get("/:id", review.getReviewById);
router.get("/employee/:employee", review.getReviewsByEmployee);
router.get("/company/:company", review.getReviewsByCompany);
router.post("/", review.addReview);
router.put("/:id", review.updateReview);
router.delete("/:id", review.deleteReview);

module.exports = router;
