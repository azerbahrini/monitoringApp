const express = require('express');
const router = express.Router();
const taskController = require('../../controllers/task.controller');
const getAllValidator = require('../../middleware/validators/getAllValidators/getAllValidator');

const {
  addTaskValidator,
  addManyTaskValidator,
  updateTaskValidator,
  getTaskByIdValidator,
  updateTaskStateValidator,
  getTasksByFilterValidator,
  getFiltredTasksValidator,
  getTasksByUserId,
  systemStatsValidator,
  getCreatedTasksValidator,
  updateAssigneeValidator,
  getTaskListValidator
} = require('../../middleware/validators/task');
router.post('/allTasksByCriteria', getTaskListValidator, taskController.getAllTasksByCriteria);
router.get('/getworkflowTasks', getTasksByUserId, taskController.getUserTasksWithState)
router.get('/getTasksByUserId', getTasksByUserId, taskController.getTasksByUserId)
router.get('/getTasksByFilter', getTasksByFilterValidator, taskController.getTasksByFilter);
router.get('/getFiltredTasks', getFiltredTasksValidator, taskController.getTasks);
router.get('/getCreatedTasks', getCreatedTasksValidator, taskController.getCreatedTasks);

router.patch('/updateAssignee', updateAssigneeValidator, taskController.updateAssigneeTasks)
router
  .route('/:id')
  .get(getTaskByIdValidator, taskController.getTaskById)
  .patch(updateTaskValidator, taskController.updateTaskByUserRole)
router.get('/', getAllValidator, taskController.getAllTask);
router.post('/addOne', addTaskValidator, taskController.addTask);
router.post('/addMany', addManyTaskValidator, taskController.addManyTask);

router.put(
  '/finishTask/:id',
  updateTaskStateValidator,
  taskController.finishTask
);
router.put(
  '/validateTask/:id',
  updateTaskStateValidator,
  taskController.validateTask
);
router.put(
  '/rejectTask/:id',
  updateTaskStateValidator,
  taskController.rejectTask
);
router.put(
  '/deleteTask/:id',
  updateTaskStateValidator,
  taskController.deleteTask
);
router.put(
  '/cancelTask/:id',
  updateTaskStateValidator,
  taskController.cancelTask
);
router.put(
  '/closeTask/:id',
  updateTaskStateValidator,
  taskController.closeTask
);

router.get('/system/getSystemStats', systemStatsValidator, taskController.getSystemStats);

module.exports = router;
