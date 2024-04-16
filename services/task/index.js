const addTaskService = require('../../services/task/addTask.service');
const addManyTaskService = require('../../services/task/addManyTask.service');
const getAllTaskService = require('../../services/task/getAllTask.service');
const getTaskByIdService = require('../../services/task/getByIdTask.service');
const updateTaskByUserRole = require('./updateTaskByUserRole.service');
const getTasks = require('./getTasks');
const autoCancelCron = require('../../services/task/autoCancelCron');
const updateAssigneeTasks = require('../../services/task/updateAssignee')
const virtualTasksGeneratorService = require('../../services/task/virtualTasksGenerator');
const getTasksByFilterService = require('../../services/task/getTasksByFilter.service');
const getTaskByUserIdService = require('../../services/task/getTaskByUserId');
const checkCreatedTasksService = require('../../services/task/checkCreatedTasks.service');
const getSystemStatsService = require('./getSystemStatsService');
const getTaskHighlightsService = require('../../services/task/getTaskHighlights');
const autoStartTaskCron = require('../../services/task/autoStartTaskCron');
const getUserTasksWithState = require('../../services/task/getUserTasksWithState')
const updateTasks = require('../../services/task/updateTasks');
const getTaskList = require('../../services/task/getTaskList')
const numberOfTasksByCriteria = require('../../services/task/numberOfTasksByCriteria')

module.exports = {
  addTaskService,
  addManyTaskService,
  getAllTaskService,
  getTaskByIdService,
  updateTaskByUserRole,
  getTasks,
  autoCancelCron,
  updateAssigneeTasks,
  virtualTasksGeneratorService,
  getTasksByFilterService,
  getTaskByUserIdService,
  checkCreatedTasksService,
  getTaskHighlightsService,
  autoStartTaskCron,
  getSystemStatsService,
  updateTasks,
  getUserTasksWithState,
  getTaskList,
  numberOfTasksByCriteria
};
