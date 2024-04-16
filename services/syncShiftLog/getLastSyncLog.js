const shiftSyncLog = require("../../models/shiftSyncLog");

module.exports = async function (req, res) {
  try {
    const logs = await shiftSyncLog.find().populate({ path: "user", select: ['firstName', 'lastName'] }).lean().exec();
    d = 0;
    lastlog = {};
    for (let i = 0; i < logs.length; i++) {
      if (logs[i].shiftsSyncDate) {
        if (new Date(logs[i].shiftsSyncDate).getTime() > d) {
          d = new Date(logs[i].shiftsSyncDate).getTime();
          lastlog = logs[i];
        }
      }
    }

    return { data: lastlog, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
