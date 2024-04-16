//Model Object
const Task = require("../../models/Task");
const moment = require('moment');
const momentTz = require('moment-timezone');

module.exports = async (generatedTasks, memberId, startDate, endDate,timeZone, serviceType) => {
  try {
    const start = new Date(moment(startDate));
    const end = new Date(moment(endDate));
    let notCreatedTasks = [];
    let createdTasksfiltred= [];
    const conditions = serviceType === "virtual"?{
      estimatedStart: { $gte: start, $lt: end },
    }:{
      estimatedStart: { $gte: start, $lt: end },
      assignee: memberId,
      state: {$in:["Pending","In progress"]}
    };
    const createdTasksAll = await Task.find(conditions)
    .populate(
      [
        {
          path: "system",
          select: "name",
          populate: { path: "customer", select: "label" },
        }
      ]
    )
    .lean().exec();
    generatedTasks.forEach(element => {
      let exist = false;
      createdTasksAll.forEach(item => {
        if (element?.map?.toString() === item?.map?.toString() && 
        moment(element?.estimatedStart).utc().format() === moment(item?.estimatedStart).utc().format()) {
          exist = true;
          createdTasksfiltred.push({...item,estimatedStart:momentTz(item.estimatedStart).tz(timeZone).format()});
        }
      });
      !exist && notCreatedTasks.push(element);
    });

    return { data: serviceType === "virtual"?notCreatedTasks:createdTasksfiltred, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
