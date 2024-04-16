const express = require("express");
const router = express.Router();
const levelController = require("../../controllers/level.controller");
const validator = require("../../middleware/validators/level");

router.get("/", validator.getAllValidator, levelController.getAllLevels);
router.post("/", validator.addValidator, levelController.addLevel);

router.patch("/:id", validator.updateValidator, levelController.updateLevel);

module.exports = router;
