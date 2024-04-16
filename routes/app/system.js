const express = require('express');
const router = express.Router();
const systemController = require('../../controllers/system.controller');
const validator = require('../../middleware/validators/system');
const getAllValidator = require('../../middleware/validators/getAllValidators/getAllValidator');

router.get(
  '/',
  getAllValidator,
  systemController.getAllSystemController
);

router.get(
  '/forMaps',
  validator.getSystemsForMapsValidator,
  systemController.getSystemsForMaps
);

router.post('/', validator.addValidation, systemController.addSystemController);

router.get(
  '/:id',
  validator.getByIdValidation,
  systemController.getSystemByIdController
);

router.get(
  '/contactList/:id',
  validator.getContactList,
  systemController.getListContact
);

router.patch(
  '/update/:id',
  validator.updateValidation,
  systemController.updateSystemController
);
router.patch(
  '/addContact/:id',
  validator.updateValidation,
  systemController.addSystemContact
);

router.patch(
  '/delete/:id',
  validator.deleteValidation,
  systemController.deleteSystem
);
router.get(
  '/SystemsByCustomer/:customer_Id',
  validator.getAllSystemByCustomerIdValidation,
  systemController.getAllSystemByCustomerId
);

router.get(
  '/getTypesbyCustomerId/:customerId',
  validator.getByIdValidation,
  systemController.getTypes
);

router.get(
  '/getCategoriesByTypeByCustomerId/:customerId/type/:typeId',
  validator.getByIdValidation,
  systemController.getCategory
);

router.get(
  '/getSystemsByCustomerIdByTypeIdByCategoryId/:customerId/type/:typeId/category/:categoryId',
  validator.getByIdValidation,
  systemController.getSystemByTypeByCategoryByCustomer
);
router.get(
  '/SystemsCategoriesByCustomer/:customer_Id',
  validator.getAllSystemCategoriesByCustomerIdValidation,
  systemController.getAllCategoriesByCustomerId
);
router.get(
  '/systemTypes/customer/:customer_Id/category/:category_Id',
  validator.getAllSystemTypesByCustomerIdCategoryIdValidation,
  systemController.getAllTypesByCustomerIdCategoryId
);

router.get('/systems-info/:customerId', validator.getSystemsInfoForDashboard, systemController.getSystemsInfoForDashboard)
module.exports = router;
