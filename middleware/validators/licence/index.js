const addLicenceValidator = require("./addLicence.validator");
const getLicenceByIdValidator = require("./getLicenceById.validator");
const deleteLicenceValidator = require("./deleteLicence.validator");
const updateLicenceValidator = require("./updateLicence.validator");
const getLicenceByCustomerValidator = require("./getLicenceByCustomer.validator");
module.exports = {
  addLicenceValidator,
  getLicenceByIdValidator,
  deleteLicenceValidator,
  updateLicenceValidator,
  getLicenceByCustomerValidator
};
