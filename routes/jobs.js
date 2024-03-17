const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobs");
const companyPermissions = require("../middlewares/company.permissions");

router.get("/", jobController.getAllJobs);
router.get("/:id", jobController.getJobById);
router.get("/company/:company", jobController.getJobByCompany);
router.post("/", companyPermissions, jobController.createJob);
router.put("/:id", companyPermissions, jobController.updateJob);
router.patch("/:id", companyPermissions, jobController.patchJob);
router.delete("/:id", companyPermissions, jobController.deleteJob);

module.exports = router;
