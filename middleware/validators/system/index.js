const addValidation = require('./add');
const getByIdValidation = require('./getById');
const updateValidation = require('./update');
const deleteValidation = require('./delete');
const getAllSystemByCustomerIdValidation = require('./getAllSystemByCustomerIdValidation');
const getContactList = require('./getContactList');
const getAllSystemCategoriesByCustomerIdValidation = require('./getAllSystemCategoriesByCustomerIdValidation');
const getAllSystemTypesByCustomerIdCategoryIdValidation = require('./getAllSystemTypesByCustomerIdCategoryIdValidation');
const getSystemsForMapsValidator = require('./getSystemsForMapsValidator');
const getSystemsInfoForDashboard = require('./getSystemsInfoForDashboard');

module.exports = {
  addValidation,
  getByIdValidation,
  updateValidation,
  deleteValidation,
  getAllSystemByCustomerIdValidation,
  getContactList,
  getAllSystemCategoriesByCustomerIdValidation,
  getAllSystemTypesByCustomerIdCategoryIdValidation,
  getSystemsForMapsValidator,
  getSystemsInfoForDashboard
};
