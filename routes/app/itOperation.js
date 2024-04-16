const express = require("express");
const router = express.Router();
const itOperationController = require("../../controllers/itOperation.controller");
const {
  addItOperationValidator,
  cancelItOperationValidator,
  finishItOperationValidator,
  updateItOperationValidator,
  getAllArchivedItOperationValidator,
  getAllActiveItOperationValidator,
  sendChangesItOperationValidator,
  remindItOperationValidator,
  getITOperationBySystemId,
} = require("../../middleware/validators/itOperation");

router.post("/", addItOperationValidator, itOperationController.addItOperation);
router.patch(
  "/cancel/:id",
  cancelItOperationValidator,
  itOperationController.cancelItOperation
);
router.patch(
  "/finish/:id",
  finishItOperationValidator,
  itOperationController.finishItOperation
);
router.patch(
  "/remind/:id",
  remindItOperationValidator,
  itOperationController.remindItOperation
);
router.get(
  "/getAllActive",
  getAllActiveItOperationValidator,
  itOperationController.getAllActiveItOperation
);
router.get(
  "/getAllArchived",
  getAllArchivedItOperationValidator,
  itOperationController.getAllArchivedItOperation
);
router.patch(
  "/sendChanges/:id",
  sendChangesItOperationValidator,
  itOperationController.sendChanges
);
router.patch(
  "/update/:id",
  updateItOperationValidator,
  itOperationController.updateItOperation
);
router.get(
  "/AllItOperationBySystemID/:sysId",
  getITOperationBySystemId,
  itOperationController.getAllItOperationBySystem
);
module.exports = router;
