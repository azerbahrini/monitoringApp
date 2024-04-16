const express = require("express");
const router = express.Router();
const hostController = require("../../controllers/host.controller");
const validator = require("../../middleware/validators/host");

router.post("/", validator.addValidation, hostController.addHostController);
router.get(
  "/:id",
  validator.getByIdValidation,
  hostController.getHostByIdController
);

router.patch(
  "/update/:id",
  validator.updateValidation,
  hostController.updateHostController
);
router.patch(
  "/delete/:id",
  validator.deleteValidation,
  hostController.deleteHostController
);
router.get(
  "/getBySystem/:sysId",
  validator.getByIdValidation,
  hostController.getAllHostBySystem
);

module.exports = router;
