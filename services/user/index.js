const findUserByProperty = require("./findUserByProperty.service");
const addUser = require("./addUser.service");
const deleteUserById = require("./deleteUserById.service");
const getAllUser = require("./getAllUser.service");
const changePassword = require("./changePassword.service");
const changeSimpleUserInformation = require("./changeSimpleUserInformation.service");
const allUser = require("./getAllUsers");
const activateUser = require("./activateUser")
module.exports = {
  findUserByProperty,
  addUser,
  deleteUserById,
  getAllUser,
  changePassword,
  changeSimpleUserInformation,
  allUser,
  activateUser
};
