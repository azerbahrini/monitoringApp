const getCustomerByIdService = require("./getCustomerById.service");
const getAllCustomerService = require("./getAllCustomer.service");
const addCustomerService = require("./addCustomer.service");
const updateCustomerService = require("./updateCustomer.service");
const getCustomersInfoForDashboardService = require('./getCustomersInfoForDashboard.service');

module.exports = {
  getCustomerByIdService,  
  getAllCustomerService,
  addCustomerService,
  updateCustomerService,
  getCustomersInfoForDashboardService

};
