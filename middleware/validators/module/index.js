const addModuleValidator = require("./addModule.validator");
const getModuleByIdValidator = require("./getModuleById.validator");
const deleteModuleValidator = require("./deleteModule.validator");
const updateModuleValidator = require("./updateModule.validator");
const getAllBasicModuleValidator = require("./getAllBasicModule.validator");

module.exports = {
  addModuleValidator,
  getModuleByIdValidator,
  deleteModuleValidator,
  updateModuleValidator,
  getAllBasicModuleValidator
};
