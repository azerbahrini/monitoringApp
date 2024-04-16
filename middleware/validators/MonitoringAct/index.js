const addMonitoringActivityValidation = require("./add");
const updateMonitoringActivityValidation = require("./update");
const getAllMonitoringActivityValidation = require("./getAll");
const getNotAssignedValidation = require("./getNotAssigned");


module.exports = {
  getNotAssignedValidation,
  addMonitoringActivityValidation,
  updateMonitoringActivityValidation,
  getAllMonitoringActivityValidation,
  
};
