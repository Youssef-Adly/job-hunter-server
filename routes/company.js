const express = require("express");
const router = express.Router();
const company = require("../controllers/company");

router.get("/", company.getAllCompanies);
router.get("/:id", company.getCompanyById);
router.post("/", company.createCompany);
router.put("/:id", company.updateCompany);
router.patch("/:id", company.patchCompany);
router.delete("/:id", company.deleteCompany);

module.exports = router;
