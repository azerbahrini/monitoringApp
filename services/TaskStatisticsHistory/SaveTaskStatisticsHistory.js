const TaskStatisticsHistory = require("../../models/TaskStatisticsHistory");

module.exports = async (data) => {
    try {
      const saveResult = await TaskStatisticsHistory.create({ result: data });
      return { data: saveResult, status: "success", code : 200 };
    } catch (err) {
      return { err, status: "error" , code : 400 };
    }
  };
  