const express = require("express");
const router = express.Router();

//Controller object : contains the crud controllers
const typeController = require("../../controllers/type.controller");
// Validator object : contains the crud validations
const validators = require("../../middleware/validators/type");
const getAllValidator = require("../../middleware/validators/getAllValidators/getAllWithIsActive");

router
  .route("/")
  .get(getAllValidator, typeController.getAllType)
  .post(validators.addValidator, typeController.addType);
router
  .route("/:id")
  .get(validators.getValidation, typeController.getTypeById)
  .patch(validators.updateValidator, typeController.updateSystemType);
//   .delete(validators.deleteValidation, typeController.deleteClass);

module.exports = router;
