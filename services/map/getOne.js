const MAP = require("../../models/MonitoringActivityPlannification");
const minsToString = require("../../utils/minutesToString");
const stringToMinutes = require("../../utils/stringToMinutes");
const moment = require('moment')

module.exports = async (id, timeZone) => {
  try {
    let map = await MAP.findOne({ _id: id, active: true }).populate([
      { path: "monitoringAct", select: ["_id", "activity", "description"] },
    ]);
    let newMapFormat = map._doc;
    let convertedStartTime = stringToMinutes(moment(moment.tz(Math.floor(map.startTime / 60) + ':' + map.startTime % 60, 'HH:mm', 'UTC')).tz(timeZone).format('HH:mm'));

    newMapFormat = {
      ...newMapFormat,
      periodicity: minsToString(map.periodicity),
      _periodicity:(minsToString(map.periodicity,false).replace('h ', ':').replace('m' , '')),
      startTime: minsToString(convertedStartTime, true),
      _startTime: moment(minsToString(convertedStartTime,true), ["h:mm A"]).format("HH:mm"),
      estimation: minsToString(map.estimation),
      _estimation: (minsToString(map.estimation,false).replace('h ', ':').replace('m' , ''))
    }
    if (!map) {
      return {
        err: { message: "MAP not found" },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: newMapFormat, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
