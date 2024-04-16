const taskService = require("../services/task");
const moment = require('moment');
const logger = require("../config/logger");
const jwt_decode = require('jwt-decode');
const shiftService = require("../services/shift")
const autoStartTaskCron = require("../services/task/autoStartTaskCron");
const mongoose = require("mongoose");
const roleService = require("../services/role")
const taskActivityLogService = require('../services/taskActivityLog');

//Add Task
exports.addTask = async function (req, res) {
  const timeZone = req.query.timeZone;
  const result = await taskService.addTaskService(req.body, timeZone);
  if (result.status === 'success') {
    logger.info(
      'add Task success',
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    const userId = req.body.assignee;
    const reportingTasks = await taskActivityLogService.updateCurrentTaskActivity(timeZone, userId);
    if (reportingTasks.status !== 'success') {
      return res.status(reportingTasks.statusCode).json({ message: reportingTasks.err.message });
    }
    autoStartTaskCron(result.data);
    return res.status(201).json({ data: result.data });
  } else {
    logger.error(
      'add Task :' + result.err.message,
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(400).json({ message: result.err.message });
  }
};

//Add Many Task
exports.addManyTask = async function (req, res) {
  const tasks = req.body.map(task=>{
    if(moment().utc().isAfter(moment(task.estimatedStart).utc().add(2,'h').format())){
      return{
        ...task, state:"Canceled"
      }
    }else if(moment().utc().isAfter(moment(task.estimatedStart).utc().format())){
      return{
        ...task, state:"In progress"
      }
    }else{
      return{
        ...task
      }
    }
  })
  const result = await taskService.addManyTaskService(tasks);
  if (result.status == "success") {
    logger.info(
      "add Many Task success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    result.data.forEach(element => {
      if(element.state == "Pending" || element.state == "In progress"){
      autoStartTaskCron(element);
      }
    });
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "add Many Task :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(400).json({ message: result.err.message });
  }
};
//Get Filtred Tasks By User
exports.getTasksByUserId = async function (req, res) {
  let searchValue = req.query.searchValue;
  let type = req.query.type;
  let state = req.query.state;
  let timeZone = req.query.timeZone;
  let shiftStartDate 
  let shiftEndDate  
  let accessToken = req.header("x-auth-accessToken");

  let decodedUserId = jwt_decode(accessToken).user.id.toString();

  const shiftResult = await shiftService.getShiftByUserIDService(decodedUserId)

  shiftStartDate =shiftResult.data?.startDate
  shiftEndDate = shiftResult.data?.endDate
  
  const result = await taskService.getTaskByUserIdService(
    decodedUserId,
    searchValue,
    type,
    state,
    shiftStartDate,
    shiftEndDate,
    timeZone
  );
  if (result.status == "success") {
    logger.info(
      "get All Task By ID success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  } else if (result.status == "no data"){

    return res.status(204).json({ data: result.error.message})

  } else {
    logger.error(
      "get All Task By ID :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(400).json({ message: result.err.message });
  }
};

//Get All Task
exports.getAllTask = async function (req, res) {
  let page = req.query.page;
  let size = req.query.size;
  const result = await taskService.getAllTaskService(page, size);
  if (result.status == "success") {
    logger.info(
      "get All Task success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "get All Task :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(400).json({ message: result.err.message });
  }
};

//Get Task by Id
exports.getTaskById = async function (req, res) {
  const result = await taskService.getTaskByIdService(req.params.id);
  if (result.status == "success") {
    logger.info(
      "get by id Task success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "get by id Task :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};
// update assignee on a task
exports.updateAssigneeTasks = async function (req, res) {
  let toUpdate = { assignee: req.body.assigneeId }
  if (req.body?.toCancel === true) {
    toUpdate = {state:"Canceled"}
  }

  if (Object.hasOwnProperty.bind(toUpdate)('assignee')){
    const teamLeaderId = req.body.teamLeaderId
    const tlShift = await shiftService.getShiftByUserIDService(teamLeaderId)
    const newAssigneeShift = await shiftService.getMemberShiftByUserId(toUpdate.assignee, tlShift.data.startDate, tlShift.data.endDate)
    const newAssigneeShiftStart = moment(newAssigneeShift.data.startDate).unix()
    const newAssigneeShiftEnd = moment(newAssigneeShift.data.endDate).unix()
    let breakOut = false;
    req.body.taskObjects.forEach(task => {
      const taskStart = moment(task.estimatedStart).unix()
      if (taskStart < newAssigneeShiftStart || taskStart > newAssigneeShiftEnd){
        breakOut = true
        return false
      }
    });

    if (breakOut) {
      return res.status(203).json({ message: 'One or more tasks cannot be assigned to this user' })
    }
  }

  const result = await taskService.updateAssigneeTasks(req.body , toUpdate);

  if (result.status == "success") {
    logger.info("Update Task Assignee success",req.route? req.baseUrl+req.route.path:"testing", req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res.status(201).json({ data: result.data });
  } else 
  if (result.status == "incomplete") {
    logger.info("Update Task Assignee Incomplete",req.route? req.baseUrl+req.route.path:"testing", req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res.status(400).json({ error :result.err ,data: result.data  });
  } else {
    logger.error("Update Task Assignee :"+result.err.message, req.route? req.baseUrl+req.route.path:"testing",  req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res.status(result.statusCode ? result.statusCode : 400)
    .json({ message: result.err.message });
}
}


exports.updateTaskByUserRole = async function (req, res) {
  let taskId = req.params.id
  let userToken = req.header("x-auth-accessToken"); 
  let userId = jwt_decode(userToken).user.id.toString();
  let dateNow = moment().utc().set('second', 0).format();
  let execute = false
  const roles = await roleService.getAllRoleByUser(userId , dateNow, "shift")
  let roleNames = []
  roles.data.forEach(item => roleNames.push(item.role.label))
const task = await taskService.getTaskByIdService(taskId)
   if (roleNames.includes("Team Leader")) {
execute = true
} else 
      if(task?.data?.assignee.toString() === userId) {
execute = true
}
      const result = await taskService.updateTaskByUserRole(taskId, req.body , execute)
  if (result.status == "success") {
    logger.info(
      "update Task success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "update Task :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Get Filtred Tasks
exports.getTasks = async function (req, res) {
  let searchValue = req.query.searchValue;
  let type = req.query.type;
  let state = req.query.state;
  let timeZone = req.query.timeZone;
  let shiftStartDate 
  let shiftEndDate  
  let accessToken = req.header("x-auth-accessToken");
  let decodedUserId = jwt_decode(accessToken).user.id.toString();

  const shiftResult = await shiftService.getShiftByUserIDService(decodedUserId)

  shiftStartDate =shiftResult.data?.startDate
  shiftEndDate = shiftResult.data?.endDate
  const result = await taskService.getTasks(
    searchValue,
    type,
    state,
    shiftStartDate,
    shiftEndDate,
    timeZone
  );
  if (result.status == "success") {
    logger.info(
      "get All Task success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
   
  } else 

    if(result.status === "no data") {
      return res.status(result.statusCode).json({ message: result.error.message});
  } else {
    logger.error(
      "get All Task :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(400).json({ message: result.err.message });
  }
};

//Finish Task
exports.finishTask = async function (req, res) {
  const id = req.params.id;
  const findResult = await taskService.getTaskByIdService(id);
  if (findResult.status == "error") {
    return res
      .status(404)
      .json({ message: "No task can be found with this ID." });
  } else {
    const currentState = findResult.data.state;
    if (currentState === "In progress") {
      findResult.data.state = "Done";
      const updateResult = await taskService.updateTasks(
        id,
        findResult.data
      );
      if (updateResult.status == "success") {
        logger.info(
          "Finished the Task",
          req.route ? req.baseUrl + req.route.path : "testing",
          req.method ? req.method : "testing",
          req.ip ? req.ip : "testing"
        );
        return res
          .status(200)
          .json({
            data: updateResult.data,
            message: "Successfully Finished the task",
          });
      } else {
        logger.error(
          "Failed to finish the Task :" + updateResult.err.message,
          req.route ? req.baseUrl + req.route.path : "testing",
          req.method ? req.method : "testing",
          req.ip ? req.ip : "testing"
        );
        return res.status(400).json({ message: updateResult.err.message });
      }
    } else {
      return res.status(400).json({
        message: `Cannot change the Task State from ${findResult.data.state} to Done.`,
      });
    }
  }
};

// Validate Task
exports.validateTask = async function (req, res) {
  const id = req.params.id;
  const findResult = await taskService.getTaskByIdService(id);
  if (findResult.status == "error") {
    return res
      .status(404)
      .json({ message: "No task can be found with this ID." });
  } else {
    const currentState = findResult.data.state;
    if (currentState === "To be validated") {
      findResult.data.state = "Pending";
      autoStartTaskCron(findResult.data);
      const updateResult = await taskService.updateTasks(
        id,
        findResult.data
      );
      if (updateResult.status == "success") {
        logger.info(
          "Validated the Task",
          req.route ? req.baseUrl + req.route.path : "testing",
          req.method ? req.method : "testing",
          req.ip ? req.ip : "testing"
        );
        return res
          .status(200)
          .json({
            data: updateResult.data,
            message: "Successfully Validated the task",
          });
      } else {
        logger.error(
          "Failed to validate the Task :" + updateResult.err.message,
          req.route ? req.baseUrl + req.route.path : "testing",
          req.method ? req.method : "testing",
          req.ip ? req.ip : "testing"
        );
        return res.status(400).json({ message: updateResult.err.message });
      }
    } else {
      return res.status(400).json({
        message: `Cannot change the Task State from ${findResult.data.state} to Pending.`,
      });
    }
  }
};

// reject Task
exports.rejectTask = async function (req, res) {
  const id = req.params.id;
  const findResult = await taskService.getTaskByIdService(id);
  if (findResult.status == "error") {
    return res
      .status(404)
      .json({ message: "No task can be found with this ID." });
  } else {
    const currentState = findResult.data.state;
    if (currentState === "To be validated") {
      findResult.data.state = "Rejected";
      const updateResult = await taskService.updateTasks(
        id,
        findResult.data
      );
      if (updateResult.status == "success") {
        logger.info(
          "Rejected the Task",
          req.route ? req.baseUrl + req.route.path : "testing",
          req.method ? req.method : "testing",
          req.ip ? req.ip : "testing"
        );
        return res
          .status(200)
          .json({
            data: updateResult.data,
            message: "Successfully Rejected the task",
          });
      } else {
        logger.error(
          "Failed to reject the Task :" + updateResult.err.message,
          req.route ? req.baseUrl + req.route.path : "testing",
          req.method ? req.method : "testing",
          req.ip ? req.ip : "testing"
        );
        return res.status(400).json({ message: updateResult.err.message });
      }
    } else {
      return res.status(400).json({
        message: `Cannot change the Task State from ${findResult.data.state} to Rejected.`,
      });
    }
  }
};

// delete Task
exports.deleteTask = async function (req, res) {
  const id = req.params.id;
  const findResult = await taskService.getTaskByIdService(id);
  if (findResult.status == "error") {
    return res
      .status(404)
      .json({ message: "No task can be found with this ID." });
  } else {
    const currentState = findResult.data.state;
    if (currentState === "To be validated") {
      findResult.data.state = "Deleted";
      const updateResult = await taskService.updateTasks(
        id,
        findResult.data
      );
      if (updateResult.status == "success") {
        logger.info(
          "Deleted the Task",
          req.route ? req.baseUrl + req.route.path : "testing",
          req.method ? req.method : "testing",
          req.ip ? req.ip : "testing"
        );
        return res
          .status(200)
          .json({
            data: updateResult.data,
            message: "Successfully Deleted the task",
          });
      } else {
        logger.error(
          "Failed to delete the Task :" + updateResult.err.message,
          req.route ? req.baseUrl + req.route.path : "testing",
          req.method ? req.method : "testing",
          req.ip ? req.ip : "testing"
        );
        return res.status(400).json({ message: updateResult.err.message });
      }
    } else {
      return res.status(400).json({
        message: `Cannot change the Task State from ${findResult.data.state} to Deleted.`,
      });
    }
  }
};

// cancel Task
exports.cancelTask = async function (req, res) {
  const id = req.params.id;
  const findResult = await taskService.getTaskByIdService(id);
  if (findResult.status == "error") {
    return res
      .status(404)
      .json({ message: "No task can be found with this ID." });
  } else {
    const currentState = findResult.data.state;
    if (currentState !== "Canceled") {
      findResult.data.state = "Canceled";
      const updateResult = await taskService.updateTasks(
        id,
        findResult.data
      );
      if (updateResult.status == "success") {
        logger.info(
          "Canceled the Task",
          req.route ? req.baseUrl + req.route.path : "testing",
          req.method ? req.method : "testing",
          req.ip ? req.ip : "testing"
        );
        return res
          .status(200)
          .json({
            data: updateResult.data,
            message: "Successfully Canceled the task",
          });
      } else {
        logger.error(
          "Failed to Cancel the Task :" + updateResult.err.message,
          req.route ? req.baseUrl + req.route.path : "testing",
          req.method ? req.method : "testing",
          req.ip ? req.ip : "testing"
        );
        return res.status(400).json({ message: updateResult.err.message });
      }
    } else {
      return res.status(400).json({
        message: "The Task is already Canceled",
      });
    }
  }
};
//Get Tasks by filter
exports.getTasksByFilter = async function (req, res) {
  const customerId = req.query.customerId;
  const typeId = req.query.typeId;
  const categoryId = req.query.categoryId;
  const systemId = req.query.systemId;
  const teamLeaderId = req.query.teamLeaderId;
  const memberId = req.query.memberId;
  const timeZone = req.query.timeZone;
  const rangeStart = req.query.startDate;
  const rangeEnd = req.query.endDate;

  const result = await taskService.getTasksByFilterService(customerId, typeId, categoryId, systemId, teamLeaderId,
    memberId, timeZone, rangeStart, rangeEnd, 'virtual');
    if (result.status === 'success'){
      if (result.data.message){
        logger.info('get All Task By filter success', req.route? req.baseUrl+req.route.path:'testing', req.method?req.method:'testing', req.ip ? req.ip :'testing');
      return res.status(200).json({ data: [], message: result.data.message });
      } else {
      logger.info('get All Task By filter success', req.route? req.baseUrl+req.route.path:'testing', req.method?req.method:'testing', req.ip ? req.ip :'testing');
      return res.status(200).json({ data: result.data });
      }
    }
  if (result.status === 'error'){
    logger.error('get All Task By filter error :'+result.err.message, req.route? req.baseUrl+req.route.path:'testing', req.method?req.method:'testing', req.ip ? req.ip :'testing');
    if (result.statusCode === 203) {
      return res.status(203).json({ message: result.err.message });
    } else {
      return res.status(400).json({ message: result.err.message });
    }
  }
};


exports.getSystemStats = async function (req, res) {
  const customerIDFilter =  req.query.customerIDFilter ? req.query.customerIDFilter : "";
  if (customerIDFilter.length > 0  && !mongoose.Types.ObjectId.isValid(customerIDFilter)){
    return res.status(400).json({ message: "This is not a valid ID." });
  }
  const shiftResult = await shiftService.getShiftByUserIDService(req.query.userId)
  const startDate = moment(shiftResult.data?.startDate).utc().format()
  const endDate = moment(shiftResult.data?.endDate).utc().format()
  const timeZone = req.query.timeZone;
  const userId = req.query.userId;
  // get from the param 
  const result = await taskService.getSystemStatsService(
    startDate,
    endDate,
    timeZone,
    userId, 
    customerIDFilter
  );
  if (result.status !== "success") {
    return res.status(result.code).json({ message: result.err.message, status: "error" });
  }
  const highlights = await taskService.getTaskHighlightsService(
    userId,
    startDate,
    endDate
  );
  if (highlights.status !== "success") {
    return res.status(400).json({ message: highlights.err.message, status: "error" });
  }
  return res.status(200).json({
    data: {
      statistics: result.data,
      highlights: highlights.data
    }
  });
};
//Get Created Tasks
exports.getCreatedTasks = async function (req, res) {
  const customerId = req.query.customerId;
  const typeId = req.query.typeId;
  const categoryId = req.query.categoryId;
  const systemId = req.query.systemId;
  const teamLeaderId = req.query.teamLeaderId;
  const memberId = req.query.memberId;
  const timeZone = req.query.timeZone;
  let rangeStart = req.query.startDate;
  let rangeEnd = req.query.endDate;

  const result = await taskService.getTasksByFilterService(customerId,typeId,categoryId,systemId,teamLeaderId,
    memberId,timeZone,rangeStart,rangeEnd, "real");
    if (result.status == "success"){
      if(result.data.message){
        logger.info("get Created Tasks success",req.route? req.baseUrl+req.route.path:"testing", req.method?req.method:"testing", req.ip ? req.ip :"testing");
      return res.status(200).json({ data: [],message:result.data.message });
      }else{
      logger.info("get Created Tasks success",req.route? req.baseUrl+req.route.path:"testing", req.method?req.method:"testing", req.ip ? req.ip :"testing");
      return res.status(200).json({ data: result.data });
      }
    }
  if (result.status == "error"){
    logger.error("get Created Tasks error :"+result.err.message, req.route? req.baseUrl+req.route.path:"testing",  req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res.status(400).json({ message: result.err.message });
  }
};

exports.getUserTasksWithState  = async function(req, res){
  let type;
  let state;
  let startDate;
  let endDate;
  let timeZone = req.query.timeZone;
  let accessToken = req.header("x-auth-accessToken");
  let userId = jwt_decode(accessToken).user.id.toString();

  type = "[\"Monitoring\",\"Other Monitoring\"]" ;
  state = "[\"Pending\",\"In progress\",\"Completed\",\"Done\",\"Canceled\"]";
  
  let decodedUserId = jwt_decode(accessToken).user.id.toString();

  const shiftResult = await shiftService.getShiftByUserIDService(decodedUserId)

  if (!shiftResult?.data) {
    return res.status(400).json({ message: "your shift has not been found, check you shift schedule" });
  }

  if (shiftResult.data?.startDate && shiftResult.data?.endDate) {
    startDate = shiftResult.data?.startDate
    endDate =  moment(shiftResult.data?.endDate).add(2, 'h') 
  } else {
    return res.status(400).json({ message: "Shift retrieval error" });
  }

  const workflowTasks = await taskService.getUserTasksWithState(userId,type,state,startDate,endDate,timeZone) 
  if (workflowTasks.status === "success"){
    logger.info("get Created Tasks success",
      req.route? req.baseUrl + req.route.path:"testing",
      req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res.status(200).json({ data: workflowTasks.data });
  } else {
    logger.error("get Created Tasks error : " + workflowTasks.error.message,
      req.route? req.baseUrl + req.route.path:"testing",
      req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res.status(400).json({ message: workflowTasks.error.message });
}

}

exports.updateTask = async function (req, res) {
  const result = await taskService.updateTasks(req.params.id, req.body);
  if (result.status == "success") {
    logger.info(
      "update Task success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "update Task :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

// CloseTask
exports.closeTask = async function (req, res) {
  const id = req.params.id;
  const findResult = await taskService.getTaskByIdService(id);
  if (findResult.status === 'error') {
    return res
      .status(404)
      .json({ message: 'No task can be found with this ID.' });
  } else {
    const currentState = findResult.data.state;
    if (currentState === 'Completed') {
      findResult.data.state = 'Done';
      const closedTask = await taskService.updateTasks(id, findResult.data);
      if (closedTask.status === 'success') {
        logger.info(
          'Closed the Task',
          req.route ? req.baseUrl + req.route.path : 'testing',
          req.method ? req.method : 'testing',
          req.ip ? req.ip : 'testing'
        );
        return res
          .status(200)
          .json({
            data: closedTask.data,
            message: 'Successfully Closed the task.'
          });
      } else {
        logger.error(
          'Failed to reject the Task :' + closedTask.err.message,
          req.route ? req.baseUrl + req.route.path : 'testing',
          req.method ? req.method : 'testing',
          req.ip ? req.ip : 'testing'
        );
        return res.status(400).json({ message: closedTask.err.message });
      }
    } else {
      return res.status(400).json({
        message: `Cannot change the Task State from ${findResult.data.state} to Done.`
      });
    }
  }
};

exports.getAllTasksByCriteria = async function (req, res) {
  const { searchValue,
    page,
    size,
    paginate } = req.query;
    const { type,
      state,
      startDate,
      endDate,
      timeZone} = req.body;
  const result = await taskService.getTaskList( searchValue,
    type,
    state,
    startDate,
    endDate,
    timeZone,
    page,
    size,
    paginate);

    const numberOfTasks = await taskService.numberOfTasksByCriteria(searchValue, startDate, endDate, timeZone)

  if (result.status === 'success') {
    res.status(200).json({...result.data, numberOfTasks: {...numberOfTasks.data}});
  } else

  if (result.status === 'no data') {
    return res.status(result.statusCode).json({ message: result.error.message});
} else {
    res.status(result.statusCode).json({ message: result.err.message });
  }
}
