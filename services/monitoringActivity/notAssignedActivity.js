const MonitoringActivity = require("../../models/MonitoringActivity");
const MAP = require("../../models/MonitoringActivityPlannification");

module.exports = async (systemId) => {
  try {
    let notAssignedActivity = [];

    const MAPS = await MAP.find({ active: true, system: systemId })
      .populate("monitoringAct")
      .lean()
      .exec();
    const activities = await MonitoringActivity.find({isActive:true}).lean().exec();

    if (MAPS && activities) {
      activities.forEach((a) => {
        ok = true;
        MAPS.forEach((m) => {
          if (m.monitoringAct._id.toString() === a._id.toString()) {
            ok = false;
          }
        });
        if (ok) {
          notAssignedActivity.push(a);
        }
      });
    }

    return {
      data: notAssignedActivity,
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
