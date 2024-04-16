var express = require("express");
var router = express.Router();
var CategoryController = require("../../controllers/category.controller");
const validator = require("../../middleware/validators/category");
const getAllValidator = require("../../middleware/validators/getAllValidators/getAllWithIsActive");

router
  .route("/")
  .get(getAllValidator,CategoryController.getAllCategory)
  .post(validator.addValidation,CategoryController.addCategory);

router
  .route("/:id")
  .get(validator.getByIdValidation,CategoryController.getCategoryById)
  .patch(validator.updateValidation,CategoryController.updateCategory);
module.exports = router;
