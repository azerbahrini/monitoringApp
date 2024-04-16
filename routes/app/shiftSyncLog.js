const express = require('express');
const router = express.Router();
const shiftSyncLogController = require ('../../controllers/shiftSyncLog.controller');
const validator = require('../../middleware/validators/shiftSyncLog')

router.get('/getLastShiftSyncLog', validator.getValidation, shiftSyncLogController.getLatestSyncLog)
module.exports = router;