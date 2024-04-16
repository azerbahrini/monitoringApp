const addSlaContractValidator = require("./addSlaContract.validator");
const getSlaContractByIdValidator = require("./getSlaContractById.validator");
const deleteSlaContractValidator = require("./deleteSlaContract.validator");
const updateSlaContractValidator = require("./updateSlaContract.validator");
const getSlaContractByCustomerValidator = require("./getSlaContractByCustomer.validator");
const getSlaConstractBycustomerIdvalidator = require("./getSlaConstractBycustomerIdvalidator");
module.exports = {
  addSlaContractValidator,
  getSlaContractByIdValidator,
  deleteSlaContractValidator,
  updateSlaContractValidator,
  getSlaContractByCustomerValidator,
  getSlaConstractBycustomerIdvalidator,
};
