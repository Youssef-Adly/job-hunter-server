const adminValidator = require("../utils/validators/admins.vaildator");
const { adminModel } = require("../utils/DB");

const getAllAdmins = async () => {
	return await adminModel.find();
};

const getAdminById = async id => {
	return await adminModel.findById({ _id: id });
};

const getAdminByEmail = async email => {
	return await adminModel.findOne({ email });
};

const createAdmin = async admin => {
	isValid = adminValidator(admin);
	if (isValid) {
		await adminModel.create(admin);
		return admin;
	} else throw new Error("Invalid admin data");
};

const updateAdmin = async (id, admin) => {
	isValid = adminValidator(admin);
	if (isValid) {
		await adminModel.findByIdAndUpdate({ _id: id }, admin);
		return admin;
	} else throw new Error("Invalid admin data");
};

const deleteAdmin = async id => {
	return await adminModel.findByIdAndDelete({ _id: id });
};

module.exports = {
	getAllAdmins,
	getAdminById,
	createAdmin,
	updateAdmin,
	deleteAdmin,
	getAdminByEmail,
};
