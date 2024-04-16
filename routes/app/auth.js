const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const validator = require("../../middleware/validators/user");
const authentication = require("../../middleware/authentication");
const authorization = require("../../middleware/authorization");

router.post("/register", validator.registerValidator, userController.register);
router.post("/login", validator.loginValidation, userController.login);
router.post("/microsoftLogin", userController.microsoftLogin);
router.get("/",authentication, validator.getAuthorizationValidation, userController.getAuthorization);

module.exports = router;
