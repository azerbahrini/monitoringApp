const express = require("express");
const router = express.Router();

//Controller object : contains the crud controllers
const monitoringActivityController = require("../../controllers/monitoringActivity.controller");
// Validator object : contains the crud validations
const validators = require("../../middleware/validators/MonitoringAct");

router
  .route("/")
  .get(
    validators.getAllMonitoringActivityValidation,
    monitoringActivityController.getAllactivities
  )
  .post(
    validators.addMonitoringActivityValidation,
    monitoringActivityController.addActivity
  );

router
  .route("/bySystem/:systemId")
  .get(
    validators.getNotAssignedValidation,
    monitoringActivityController.getNotAssignedActivity
  );

router
  .route("/:id")
  .patch(
    validators.updateMonitoringActivityValidation,
    monitoringActivityController.updateMonitoringActivity
  );

module.exports = router;
