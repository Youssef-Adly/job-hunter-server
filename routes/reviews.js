const express = require("express");
const router = express.Router();
const review = require("../controllers/reviews");
const employeePermissions = require("../middlewares/employee.permissions");

router.get("/", review.getAllReviews);
router.get("/:id", review.getReviewById);
router.get("/employee/:employee", review.getReviewsByEmployee);
router.get("/company/:company", review.getReviewsByCompany);
router.post("/", employeePermissions, review.addReview);
router.put("/:id", employeePermissions, review.updateReview);
router.patch("/:id", employeePermissions, review.patchReview);
router.delete("/:id", employeePermissions, review.deleteReview);

module.exports = router;
