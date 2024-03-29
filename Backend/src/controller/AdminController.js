const {
  createAdminService,
  AdminLogin,
  updateAdminService,
  approveAddService,
  deleteAddService,
} = require("../services/AdminService");

exports.createAdmin = async (req, res) => {
  let result = await createAdminService(req);
  res.status(201).json(result);
};

exports.adminLogin = async (req, res) => {
  let result = await AdminLogin(req);
  res.status(200).json(result);
};

exports.updateAdmin = async (req, res) => {
  let result = await updateAdminService(req);
  res.status(200).json(result);
};

exports.approveAdmin = async (req, res) => {
  let result = await approveAddService(req);
  res.status(200).json(result);
};

exports.deleteAdds = async (req, res) => {
  let result = await deleteAddService(req);
  res.status(200).json(result);
};
