const express = require("express");
const router = express.Router();
const customerContactController = require("../../controllers/customerContact.controller");
const validator = require("../../middleware/validators/customerContact");
const getAllValidator = require("../../middleware/validators/getAllValidators/getAllValidator"); 


router.get(
  "/",
  getAllValidator,
  customerContactController.getAllCustomerContact
);
router.post(
  "/",
  validator.addCustomerContactValidator,
  customerContactController.addCustomerContact
);
router.get(
  "/:id/",
  validator.getCustomerContactByIdValidator,
  customerContactController.getCustomerContactById
);
router.get(
  "/byCustomer/:customerId",
  validator.getCustomerContactByCustomer,
  customerContactController.getContactByCustomer
);
router.post(
  "/addToSystem/:systemId",
  validator.addCustomerContactToSystemValidator,
  customerContactController.addContactToSys
);
router.patch(
  "/deleteFromSystem/:systemId/customerContact/:customerContactId",
  validator.deleteCustomerContactFromSysValidator,
  customerContactController.deleteContactFS
);
router.patch(
  "/:id",
  validator.updateCustomerContactValidator,
  customerContactController.updateCustomerContact
);
router.patch(
  "/delete/:id",
  validator.deleteCustomerContactValidator,
  customerContactController.deleteCustomerContact
);
router.get(
  "/UnAssignedCustomerContact/customer/:customerId/system/:systemId",
  validator.getUnassignedCustomerContactBySystem,
  customerContactController.getUnassignedCustomerContactBySystem
);
module.exports = router;
