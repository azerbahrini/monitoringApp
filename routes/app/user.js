const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const validator = require("../../middleware/validators/user");

router.get("/", validator.getAllValidation, userController.getAllUsers);
router.get("/microsoft", validator.getMicrosoftUser, userController.getMUser);
router.post(
  "/changePassword/:userId",
  validator.changePasswordValidation,
  userController.changePasswordUser
);
router.patch("/deleteUser/:id", validator.deleteValidation, userController.deleteUser);
router.patch(
  "/activateUser/:id",
  validator.activateUserValidation,
  userController.activateUser
);
router.patch(
  "/changeInformation/:userId",
  validator.changeUserInformationValidation,
  userController.changeUserInformation
);
// router.get(
//   "/getTeamLeaders",
//   validator.getAllValidation,
//   userController.getTeamLeaderUser
// );
router.get("/getOne/:id", validator.getAllValidation, userController.getOneUser);
router.patch("/update/:id", validator.updateUserValidation, userController.updateUser);
router.delete("/:id", validator.deleteValidation, userController.deleteUser);

router.get(
  "/getCurrent",
  validator.getCurrentUserValidation,
  userController.getCurrentUser
);

router.get(
  "/getAllUsers",
  validator.getAllUsersValidator,
  userController.allUser
);
module.exports = router;
