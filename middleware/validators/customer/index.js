const addCustomerValidator = require("./addCustomer.validator");
const getCustomerByIdValidator = require("./getCustomerById.validator");
const getAllCustomerValidator = require("./getAllCustomer.validator");
const updateCustomerValidator = require("./updateCustomer.validator");
const getCustomerReportLayoutValidator = require("./getCustomerReportLayout.validator");
const getCustomersInfoForDashboardValidator = require('./getCustomersInfoForDashboard.validator');
module.exports = {
  addCustomerValidator,
  getCustomerByIdValidator,
  getAllCustomerValidator,
  updateCustomerValidator,
  getCustomerReportLayoutValidator,
  getCustomersInfoForDashboardValidator
};
