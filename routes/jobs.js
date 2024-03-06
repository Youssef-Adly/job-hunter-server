const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobs");
const adminPermissions = require("../middlewares/admin.permissions");
const companyPermissions = require("../middlewares/company.permissions");

router.get("/", jobController.getAllJobs);
router.get("/:id", jobController.getJobById);
router.post("/", companyPermissions, jobController.createJob);
router.put("/:id", adminPermissions, jobController.updateJob);
router.delete("/:id", companyPermissions, jobController.deleteJob);

module.exports = router;
