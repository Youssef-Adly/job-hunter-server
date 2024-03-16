const express = require("express");
const router = express.Router();
const application = require("../controllers/applications");

router.get("/", application.getAllApplications);
router.get("/:id", application.getApplicationById);
router.get("/employee/:employee", application.getApplicationsByEmployee);
router.get("/company/:company", application.getApplicationsByCompany);
router.post("/", application.createApplication);
router.put("/:id", application.updateApplication);
router.patch("/:id", application.patchApplication);
router.delete("/:id", application.deleteApplication);

module.exports = router;
