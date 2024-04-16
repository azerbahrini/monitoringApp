const addValidator = require("../../../middleware/validators/type/add");
const updateValidator = require("../../../middleware/validators/type/update");
const getValidation = require("../../../middleware/validators/type/getById");
const deleteValidation = require("../../../middleware/validators/type/delete");

module.exports = {
  addValidator,
  updateValidator,
  getValidation,
  deleteValidation,
};
