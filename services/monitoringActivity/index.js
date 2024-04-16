const addMonitoringActivityService = require("./add");
const getAllMonitoringActivityService = require("./getAll");
const updateMonitoringActivityService = require("./update");
const getNotAssignedActivityService=require("./notAssignedActivity")

module.exports = {
  getNotAssignedActivityService,
  addMonitoringActivityService,
  getAllMonitoringActivityService,
  updateMonitoringActivityService,
};
