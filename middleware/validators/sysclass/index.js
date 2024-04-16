const addValidator = require("../../../middleware/validators/sysclass/add");
const updateValidator = require("../../../middleware/validators/sysclass/update");
const getValidation = require("../../../middleware/validators/sysclass/get");
const deleteValidation = require("../../../middleware/validators/sysclass/delete");

module.exports = {
  addValidator,
  updateValidator,
  getValidation,
  deleteValidation,
};
