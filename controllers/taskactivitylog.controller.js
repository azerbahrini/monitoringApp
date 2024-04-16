const taskActivityLogService = require('../services/taskActivityLog');
const moment = require('moment');

exports.getTaskActivityLogs = async function (req, res) {
  const { shiftName } = req.query;
  const { date, timeZone } = req.body;
  const dateVariable = new Date(moment.tz(date, timeZone).tz('UTC'));
  const result = await taskActivityLogService.getTaskActivityLogs(dateVariable, shiftName);
  if (result.statusCode === 200) {
    return res.status(result.statusCode).json({ data: result.data, status: result.status });
  } else {
    return res.status(result.statusCode).json({ message: result.err.message, status: result.status });
  }
};
