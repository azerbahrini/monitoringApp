const moment = require("moment");

module.exports = (minutes, clockTime) => {
  let hours;
  let mins;
  let time;
  let cTime;
  try {
    hours = Math.trunc(minutes / 60);
    mins = minutes % 60;
    time = moment(hours.toString().padStart(2, "0") + ":" + mins, "hh:mm").format('LT')
    cTime = hours + "h " + mins + "m";
    if (clockTime) {
      return time.toString();
    } else {
      return cTime.toString();
    }
  } catch (err) {
    console.log(err.message);
    return { err: err, status: "error" };
  }
};
