const express = require("express");
const router = express.Router();
const employees = require("../controllers/employees");

router.get("/", employees.getAllEmployees);
router.get("/:id", employees.getEmployeeById);
router.post("/", employees.createEmployee);
router.put("/:id", employees.updateEmployee);
router.patch("/:id", employees.patchEmployee);
router.delete("/:id", employees.deleteEmployee);

module.exports = router;
