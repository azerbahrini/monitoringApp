const addCustomerContactValidator = require("./addCustomerContactValidator");
const updateCustomerContactValidator = require("./updateCustomerContactValidator");
const getCustomerContactByIdValidator = require("./getCustomerContactByIdValidator");
const deleteCustomerContactValidator = require("./deleteCustomerContactValidator");
const addCustomerContactToSystemValidator = require("./addCustomerContactToSystemValidator");
const deleteCustomerContactFromSysValidator = require("./deleteCustomerContactFromSysValidator");
const getCustomerContactByCustomer = require("./getCustomerContactByCustomer");
const getUnassignedCustomerContactBySystem = require("./getUnassignedCustomerContactBySystem");
module.exports = {
  addCustomerContactValidator,
  updateCustomerContactValidator,
  getCustomerContactByIdValidator,
  deleteCustomerContactValidator,
  addCustomerContactToSystemValidator,
  deleteCustomerContactFromSysValidator,
  getCustomerContactByCustomer,
  getUnassignedCustomerContactBySystem,
};
