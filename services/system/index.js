const addSystemService = require('./add');
const getSystemByIdService = require('./getById');
const updateSystemService = require('./update');
const getAllSystemService = require('./getAll');
const deleteSystemService = require('./delete');
const getAllSystemByCustomerId = require('./getAllSystemByCustomerId');
const addCustomerContactToSystem = require('./addSystemContact');
const getContactList = require('./getContactList');
const getAllCategoriesByCustomerId = require('./getAllCategoriesByCustomerId');
const getAllTypesByCustomerIdCategoryId = require('./getAllTypesByCustomerIdCategoryId');
const getTypes = require('./getTypesbyCustomerId');
const getCategory = require('./getCategoriesByTypeByCustomer');
const getSystemByTypeByCategoryByCustomer = require('./getSystemByTypeIdByCategoryIdByCustomerId');
const getSystemsForMapsService = require('./getSystemsForMapsService');
const getSystemsInfoForDashboard = require('./getSystemsInfoForDashboard')

module.exports = {
  addSystemService,
  getSystemByIdService,
  updateSystemService,
  getAllSystemService,
  deleteSystemService,
  getAllSystemByCustomerId,
  addCustomerContactToSystem,
  getContactList,
  getAllCategoriesByCustomerId,
  getAllTypesByCustomerIdCategoryId,
  getTypes,
  getCategory,
  getSystemByTypeByCategoryByCustomer,
  getSystemsForMapsService,
  getSystemsInfoForDashboard
};
