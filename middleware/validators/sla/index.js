const addSlaValidator = require("./addSla.validator");
const getSlaByIdValidator = require("./getSlaById.validator");
const deleteSlaValidator = require("./deleteSla.validator");
const updateSlaValidator = require("./updateSla.validator");
const getSlaBySlaContractValidator = require("./getSlaBySlaContract.validator");
module.exports = {
  addSlaValidator,
  getSlaByIdValidator,
  deleteSlaValidator,
  updateSlaValidator,
  getSlaBySlaContractValidator
};
