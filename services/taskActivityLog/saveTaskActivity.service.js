const TaskActivityLog = require('../../models/TaskActivityLog');

module.exports = async (data, shift) => {
    let taskActivityLog;
  try {
     taskActivityLog = await TaskActivityLog.findOne({
        shift: {
            name: shift.name,
            startDate: shift.startDate,
            endDate: shift.endDate
        }
    });
    if (taskActivityLog) {
        taskActivityLog.result = data;
        await taskActivityLog.save();
    } else {
         taskActivityLog = new TaskActivityLog({
            result: data,
            shift: {
                name: shift.name,
                startDate: shift.startDate,
                endDate: shift.endDate
            }
        });
        await taskActivityLog.save();
    }
    return taskActivityLog;

  } catch (err) {
    return { err, status: 'error' };
  }
};
