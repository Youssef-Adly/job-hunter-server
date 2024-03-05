const express = require("express");
const router = express.Router();
const admins = require("../controllers/admins");

router.get("/", admins.getAllAdmins);
router.get("/:id", admins.getAdminById);
router.post("/", admins.createAdmin);
router.put("/:id", admins.updateAdmin);
router.delete("/:id", admins.deleteAdmin);

module.exports = router;
