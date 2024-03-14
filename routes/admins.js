const express = require("express");
const router = express.Router();
const admins = require("../controllers/admins");
const adminPermissions = require("../middlewares/admin.permissions");

router.get("/", admins.getAllAdmins);
router.get("/:id", admins.getAdminById);
router.post("/", adminPermissions, admins.createAdmin);
router.put("/:id", adminPermissions, admins.updateAdmin);
router.patch("/:id", adminPermissions, admins.patchAdmin);
router.delete("/:id", adminPermissions, admins.deleteAdmin);

module.exports = router;
