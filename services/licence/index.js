const addLicenceService = require("./addLicence.service");
const getLicenceByIdService = require("./getLicenceById.service");
const deleteLicenceService = require("./deleteLicence.service");
const updateLicenceService = require("./updateLicence.service");
const getLicenceByCustomerService = require("./getLicenceByCustomer.service");
const latestCustomerLicence = require("./getLatestCustomerLicence")
module.exports = {
  addLicenceService,
  getLicenceByIdService,
  deleteLicenceService,
  updateLicenceService,
  getLicenceByCustomerService,
  latestCustomerLicence
};
