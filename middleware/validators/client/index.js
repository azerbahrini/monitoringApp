const addValidation = require("./add");
const getByIdValidation = require("./getById");
const updateValidation = require("./update");
const deleteValidation = require("./delete");
const getClientsBySystemIdValidation = require("./getClientBySystemId");
module.exports = {
  getByIdValidation,
  addValidation,
  updateValidation,
  deleteValidation,
  getClientsBySystemIdValidation,
};
