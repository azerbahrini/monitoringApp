const express = require('express');
const router = express.Router();
const TaskActivitylogController = require('../../controllers/taskactivitylog.controller');
const { getTaskActivityLogsValidator } = require('../../middleware/validators/taskActivityLog');

router.get('/', getTaskActivityLogsValidator, TaskActivitylogController.getTaskActivityLogs);
module.exports = router;
