const express = require("express");
const router = express.Router();

//Controller object : contains the crud controllers
const mapController = require("../../controllers/map.controller");
// Validator object : contains the crud validations
const validators = require("../../middleware/validators/map");
const getAllValidator = require("../../middleware/validators/getAllValidators/getAllValidator"); 


router
  .route("/")
  .get(getAllValidator, mapController.getAllMaps)
  .post(validators.addValiddator, mapController.addMap);
router
  .route("/:id")
  .get(validators.getOneValiddator, mapController.getMapById)
  .patch(
    validators.updateValiddator,
    mapController.updateMap
  );
router.route("/delete/:id").patch(
  validators.deleteValiddator,
  mapController.deleteMap
);
router
  .route("/getBySystemId/:sysId/")
  .get(validators.getAllBySystem, mapController.getAllMAPBySystem);
module.exports = router;
