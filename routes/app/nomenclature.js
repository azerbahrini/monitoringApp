const express = require("express");
const router = express.Router();
const nomenclatureController = require("../../controllers/nomenclature.controller");
const validator = require("../../middleware/validators/nomenclature");

router.get("/",validator.getAllNomenclatureValidation,nomenclatureController.getAllNomenclature)
module.exports = router;