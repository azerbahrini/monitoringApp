const moment = require('moment');

module.exports = (maps, startDate, endDate, user, timeZone) => {
  try {
    const generatedTasks = [];
    const startTimeStamp = moment(startDate).unix();
    const endTimeStamp = moment(endDate).unix();

    maps.forEach(map => {

      const mapId = map._id ?? null;
      const periodicity = map.periodicity ?? null;
      const firstReport = map.startTime ?? null;
      const system = map.system ?? null;
      const title = map.monitoringAct?.activity ?? null;
      const description = map.monitoringAct?.description ?? null;

      const taskStart = moment().utc().startOf('day').add(firstReport, 'minutes').format();
      let taskStartTimeStamp = moment(taskStart).utc().unix();

      const task24start = taskStartTimeStamp;
      const task24End = task24start + (60*60*24);

      while (taskStartTimeStamp >= task24start && taskStartTimeStamp < task24End){

        if (taskStartTimeStamp >= startTimeStamp && taskStartTimeStamp < endTimeStamp){
          const task = {
            title,
            description,
            type: 'Monitoring',
            map: mapId,
            globalStatus: 'Good',
            estimatedStart: moment.unix(taskStartTimeStamp).tz(timeZone).format(),
            timeSpent: 0,
            state: 'Pending',
            assignee: user ?? null,
            system
          }
          generatedTasks.push(task);
        }
        taskStartTimeStamp += periodicity * 60;
      }

    });
    return { data: generatedTasks, status: 'success' };
  } catch (err) {
    return { err, status: 'error' };
  }
};
