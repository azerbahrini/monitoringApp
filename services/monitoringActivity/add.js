const MonitoringActivity = require("../../models/MonitoringActivity");
module.exports = async (doc) => {
  try {
    const document = await MonitoringActivity.create({ ...doc });

    return {
      data: document,
      status: "success",
    };
  } catch (err) {
    console.error(err);
    return {
      err,
      status: "error",
    };
  }
};
