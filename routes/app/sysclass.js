const express = require("express");
const router = express.Router();

//Controller object : contains the crud controllers
const sysClassController = require("../../controllers/sysclass.controller");
// Validator object : contains the crud validations
const validators = require("../../middleware/validators/sysclass");
const getAllValidator = require("../../middleware/validators/getAllValidators/getAllWithIsActive");

router
  .route("/")
  .get(getAllValidator, sysClassController.getAllClass)
  .post(validators.addValidator, sysClassController.addClass);
router
  .route("/:id")
  .get(validators.getValidation, sysClassController.getClassById)
  .patch(validators.updateValidator, sysClassController.updateSystemClass)
  .delete(validators.deleteValidation, sysClassController.deleteClass);

module.exports = router;
