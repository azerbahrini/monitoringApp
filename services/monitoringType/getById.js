const MonitoringType = require("../../models/MonitoringType");


module.exports = async (id) => {
    try {
      const doc = await MonitoringType.findOne({ _id: id }).lean().exec();
      if (!doc) {
        return {
          err: { message: "Monitoring Type not found" },
          status: "error",
          statusCode: 404,
        };
      }
      return { data: doc, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  