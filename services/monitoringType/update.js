const MonitoringType = require("../../models/MonitoringType");

module.exports = async (filter, doc) => {
    try {
      if (!filter._id) {
        return {
          err: { message: "missing ID" },
          statusCode: 404,
          status: "error",
        };
      }
      const MTypeDoc = await MonitoringType.findOneAndUpdate(filter, doc);
      if (!MTypeDoc) {
        return {
          status: "error",
          statusCode: 404,
          err: { message: "Monitoring Type not found" },
        };
      }
      const updatedMTypeDoc = await MonitoringType.findOne(filter);
      return { data: updatedMTypeDoc, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  