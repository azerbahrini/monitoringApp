const addItOperationValidator = require("./addItOperation.validator");
const cancelItOperationValidator = require("./cancelItOperation.validator");
const finishItOperationValidator = require("./finishItOperation.validator");
const getAllActiveItOperationValidator = require("./getAllActiveItOperation.validator");
const remindItOperationValidator = require("./remindItOperation.validator");
const sendChangesItOperationValidator = require("./sendChangesItOperation.validator");
const updateItOperationValidator = require("./updateItOperation.validator");
const getAllArchivedItOperationValidator = require("./getAllArchivedItOperation.validator");
const getITOperationBySystemId = require("./getITOperationBySystemId");
module.exports = {
  addItOperationValidator,
  cancelItOperationValidator,
  finishItOperationValidator,
  getAllActiveItOperationValidator,
  getAllArchivedItOperationValidator,
  remindItOperationValidator,
  sendChangesItOperationValidator,
  updateItOperationValidator,
  getITOperationBySystemId,
};
