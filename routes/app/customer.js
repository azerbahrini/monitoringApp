const express = require("express");
const router = express.Router();
const customerController = require("../../controllers/customer.controller");
const {
  addCustomerValidator,
  updateCustomerValidator,
  getCustomerByIdValidator,
  getAllCustomerValidator,
  getCustomerReportLayoutValidator,
  getCustomersInfoForDashboardValidator
} = require("../../middleware/validators/customer");
const uploadImage = require("../../middleware/uploadFile");

// router.use("/img", express.static("uploads"));
router.get("/", getAllCustomerValidator, customerController.getAllCustomer);
router.post(
  "/",
  uploadImage.single("logo"),
  addCustomerValidator,
  customerController.addCustomer
);

router.get("/getCustomerReportLayout/:customerId", getCustomerReportLayoutValidator, customerController.getCustomerReportLayout)

router.get(
  '/getCustomersInfoForDashboard',
  getCustomersInfoForDashboardValidator,
  customerController.getCustomersInfoForDashboard
);

router.get(
  "/:id/",
  getCustomerByIdValidator,
  customerController.getCustomerById
);
router.patch(
  "/update/:id",
  uploadImage.single("logo"),
  updateCustomerValidator,
  customerController.updateCustomer
);


module.exports = router;
