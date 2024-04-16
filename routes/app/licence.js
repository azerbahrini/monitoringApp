const express = require("express");
const router = express.Router();
const licenceController = require("../../controllers/licence.controller");
const {
  addLicenceValidator,
  updateLicenceValidator,
  getLicenceByIdValidator,
  getLicenceByCustomerValidator,
  deleteLicenceValidator,
} = require("../../middleware/validators/licence");

router.get(
  "/getbycustomer/:id",
  getLicenceByCustomerValidator,
  licenceController.getLicenceByCustomer
);
router.post("/", addLicenceValidator, licenceController.addLicence);
router.get(
  "/getone/:id/",
  getLicenceByIdValidator,
  licenceController.getLicenceById
);
router.patch(
  "/update/:id",
  updateLicenceValidator,
  licenceController.updateLicence
);
router.patch(
  "/delete/:id",
  deleteLicenceValidator,
  licenceController.deleteLicence
);

router
  .get("/latestLicence/:id",getLicenceByIdValidator,licenceController.getLatesLicenceByCustomerId);

module.exports = router;
