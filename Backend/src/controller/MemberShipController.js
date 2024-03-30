const {
  createMembershipService,
  readMembershipService,
  updateMembershipService,
  deleteMembershipService,
} = require("../services/MemberShipService");

exports.createMembership = async (req, res) => {
  let result = await createMembershipService(req);
  res.status(201).json(result);
};

exports.readMembership = async (req, res) => {
  let result = await readMembershipService();
  res.status(200).json(result);
};

exports.updateMembership = async (req, res) => {
  let result = await updateMembershipService(req);
  res.status(200).json(result);
};

exports.deleteMembership = async (req, res) => {
  let result = await deleteMembershipService(req);
  res.status(200).json(result);
};
