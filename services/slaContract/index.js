const addSlaContractService = require("./addSlaContract.service");
const getSlaContractByIdService = require("./getSlaContractById.service");
const deleteSlaContractService = require("./deleteSlaContract.service");
const updateSlaContractService = require("./updateSlaContract.service");
const getAllSlaContractByCustomerId = require("./getAllSlaContractByCustomerId");
module.exports = {
  addSlaContractService,
  getSlaContractByIdService,
  deleteSlaContractService,
  updateSlaContractService,
  getAllSlaContractByCustomerId,
};
