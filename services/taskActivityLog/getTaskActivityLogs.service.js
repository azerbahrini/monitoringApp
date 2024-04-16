const TaskActivityLog = require('../../models/TaskActivityLog');

module.exports = async (dateVariable, shiftName) => {
  try {
    const taskActivityLogs = await TaskActivityLog.find({
      $and: [
        {
          'shift.startDate': {
            $lte: new Date(dateVariable)
          }
        },
        {
          'shift.endDate': {
            $gte: new Date(dateVariable)
          }
        },
        {
          'shift.name': shiftName
        }
      ]
    });
    if (taskActivityLogs.length > 0) {
      return {
        statusCode: 200,
        data: taskActivityLogs,
        status: 'success'
      };
    } else {
      return {
        statusCode: 204,
        err: { message: 'No data found' },
        status: 'success'
      };
    }
  } catch (err) {
    return { err, status: 'error', statusCode: 400 };
  }
};
