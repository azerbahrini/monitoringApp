const addManyTaskValidator = require('./addManyTask.validator');
const getTaskByIdValidator = require('./getTaskById.validator');
const updateTaskValidator = require('./updateTask.validator');
const updateTaskStateValidator = require('./updateTaskState.validator');
const addTaskValidator = require('./addTask.validator');
const getTasksByFilterValidator = require('./getAllTaskByFilter.validator');
const getFiltredTasksValidator = require('./getFiltredTasksValidator');
const getTasksByUserId = require('./getTasksByUserId');
const systemStatsValidator = require('./systemStats.validator');
const getCreatedTasksValidator = require('./getCreatedTasks.validator');
const updateAssigneeValidator = require('./updateAssignee');
const getTaskListValidator = require('./getTaskListValidator');

module.exports = {
  addManyTaskValidator,
  getTaskByIdValidator,
  updateTaskValidator,
  updateTaskStateValidator,
  addTaskValidator,
  getTasksByFilterValidator,
  getFiltredTasksValidator,
  getTasksByUserId,
  systemStatsValidator,
  getCreatedTasksValidator,
  updateAssigneeValidator,
  getTaskListValidator
};
