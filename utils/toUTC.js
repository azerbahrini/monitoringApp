const moment = require("moment");

module.exports = (time, timeZone) => {

    let timeToConvert;
    let convertedTime;

    try {
        timeToConvert = moment.tz(time, timeZone)
        convertedTime = timeToConvert.utc().toISOString()
        return convertedTime
    } catch (error) {
        return error
    }
}