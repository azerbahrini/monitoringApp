const MAP = require("../../models/MonitoringActivityPlannification");


module.exports = async (doc) => {
    try {
      const document = await MAP.create({ ...doc });
      return { data: document, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  