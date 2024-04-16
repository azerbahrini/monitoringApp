const addCustomerContact = require("./addCustomerContact.service");
const getCustomerContactById = require("./getCustomerContactById.service");
const updateCustomerContact = require("./updateCustomerContact.service");
const getAllCustomerContact = require("./getCustomerContact.service");
const deleteCustomerContact = require("./deleteCustomerContact.service");
const getCustomerContactByCustomer = require("./getCustomerContactByCustomer.service");
const getUnassignedCustomerContactBySystem = require("./getUnassignedCustomerContactBySystem");
module.exports = {
  addCustomerContact,
  getAllCustomerContact,
  getCustomerContactById,
  updateCustomerContact,
  deleteCustomerContact,
  getCustomerContactByCustomer,
  getUnassignedCustomerContactBySystem,
};
