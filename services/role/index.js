const addRoleService = require("./addRole.service");
const getAllRoleService = require("./getAllRole.service");
const getRoleByIdService = require("./getRoleById.service");
const deleteRoleService = require("./deleteRole.service");
const updateRoleService = require("./updateRole.service");
const getRoleByLabelService = require("./getRoleByLabel.service");
const getAllRoleByUser = require("./getAllRoleByUser")
const getRolesForUsers = require("./getRolesForUsers")

module.exports = {
  addRoleService,
  getAllRoleService,
  getRoleByIdService,
  deleteRoleService,
  updateRoleService,
  getRoleByLabelService,
  getAllRoleByUser,
  getRolesForUsers
};
