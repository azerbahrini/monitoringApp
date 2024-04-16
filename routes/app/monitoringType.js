const express = require("express");
const router = express.Router();
const monitoringTypeController = require("../../controllers/monitoringType.controller");
const validator = require("../../middleware/validators/monitoringType");
router
  .route("/")
  .get(validator.getAllValidator, monitoringTypeController.getAllMonitoringType)
  .post(validator.addValidator, monitoringTypeController.addMonitoringType);

router
  .route("/:id")
  .get(
    validator.getByIdValidator,
    monitoringTypeController.getMonitoringTypeById
  );

router
  .route("/update/:id")
  .patch(
    validator.updateValidator,
    monitoringTypeController.updateMonitoringType
  );

router
  .route("/delete/:id")
  .delete(
    validator.deleteValidator,
    monitoringTypeController.deleteIMonitoringType
  );
module.exports = router;
