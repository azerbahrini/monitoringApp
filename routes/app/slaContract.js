const express = require("express");
const router = express.Router();
const slaContractController = require("../../controllers/slaContract.controller");
const {
  addSlaContractValidator,
  updateSlaContractValidator,
  getSlaContractByIdValidator,
  getSlaContractByCustomerValidator,
  deleteSlaContractValidator,
  getSlaConstractBycustomerIdvalidator,
} = require("../../middleware/validators/slaContract");

router.get(
  "/getbycustomer/:id",
  getSlaContractByCustomerValidator,
  slaContractController.getSlaContractByCustomer
);
router.post("/", addSlaContractValidator, slaContractController.addSlaContract);
router.get(
  "/getone/:id/",
  getSlaContractByIdValidator,
  slaContractController.getSlaContractById
);
router.patch(
  "/update/:id",
  updateSlaContractValidator,
  slaContractController.updateSlaContract
);
router.patch(
  "/delete/:id",
  deleteSlaContractValidator,
  slaContractController.deleteSlaContract
);
router.get(
  "/AllSlaContractByCustomerID/:customer_Id",
  getSlaConstractBycustomerIdvalidator,
  slaContractController.getAllSlaContractByCustomerId
);
module.exports = router;
