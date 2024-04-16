const MonitoringActivity = require("../../models/MonitoringActivity");
module.exports = async (filter, doc) => {
  try {
    const updatedMonitoringActivityDocument =
      await MonitoringActivity.findOneAndUpdate(filter, doc, {
        new: true,
      });
    if (!updatedMonitoringActivityDocument) {
      return {
        err: { message: "Monitoring Activity not found" },
        status: "error",
        statusCode: 404,
      };
    }
    return {
      data: updatedMonitoringActivityDocument,
      status: "success",
    };
  } catch (err) {
    return {
      err,
      status: "error",
    };
  }
};
