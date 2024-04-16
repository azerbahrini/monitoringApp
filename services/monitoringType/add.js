const MonitoringType = require("../../models/MonitoringType");


module.exports = async (doc) => {
    try {
      const document = await MonitoringType.create({ ...doc });
      return { data: document, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  