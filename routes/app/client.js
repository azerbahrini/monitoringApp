const express = require("express");
const router = express.Router();
const clientController = require("../../controllers/client.controller");
const validator = require("../../middleware/validators/client");
const getAllValidator = require("../../middleware/validators/getAllValidators/getAllValidator"); 

router.get("/", getAllValidator, clientController.getAllClients);
router.post("/", validator.addValidation, clientController.addClient);
router.get("/getCategoryByType", clientController.getCategoryByType);
router.get("/getTypeByCategory", clientController.getTypeByCategory);
router.get("/:id", validator.getByIdValidation, clientController.getClientById);

router.patch(
  "/update/:id",
  validator.updateValidation,
  clientController.updateClient
);
router.patch(
  "/delete/:id",
  validator.deleteValidation,
  clientController.deleteClient
);
router.get(
  "/AllBySystemID/:sysId",
  validator.getClientsBySystemIdValidation,
  clientController.getClientsBySystemId
);

module.exports = router;
