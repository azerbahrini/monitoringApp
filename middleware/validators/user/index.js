const registerValidator = require("./registerValidator");
const getAllValidation = require("./getAllValidator");
const deleteValidation = require("./deleteValidation");
const getMicrosoftUser = require("./getMicrosoftUserValidator");
const loginValidation = require("./loginValidation");
const updateUserValidation = require("./updateUserValidation");
const changePasswordValidation = require("./changePasswordValidation");
const changeUserInformationValidation = require("./changeUserInformationValidation");
const getOneUserValidation = require("./getOneUserValidation");
const getCurrentUserValidation = require("./getCurrentUserValidation");
const getAuthorizationValidation = require("./getAuthorization");
const getAllUsersValidator = require("./getAllUsersValidator");
const activateUserValidation = require("./activateUserValidation");

module.exports = {
  registerValidator,
  getAllValidation,
  deleteValidation,
  getMicrosoftUser,
  loginValidation,
  updateUserValidation,
  changePasswordValidation,
  changeUserInformationValidation,
  getOneUserValidation,
  getCurrentUserValidation,
  getAuthorizationValidation,
  getAllUsersValidator,
  activateUserValidation
};
