const resultService = require('../services/result');
const Mongoose = require('mongoose');
const formValidator = require('../middleware/validators/resultForm/ValidateForm');
const logger = require('../config/logger');
const taskService = require('../services/task');
const toBase64 = require('../utils/toBase64');
const moment = require('moment');
const toUtc = require('../utils/toUTC');

//Add Result
exports.addResult = async function (req, res) {
  const formObject = req.body;
  const taskId = req.body.task;
  const formValidation = await formValidator(taskId, formObject);
  if (formValidation.error) {
    logger.error(
      'formValidator in insert result' + formValidation.error.message,
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(400).json({ message: formValidation.error.message });
  }
  const filesIds = [];

  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      filesIds.push(req.files[i].filename);
    }
  }
  const resultBody = { ...req.body, dataSet: JSON.parse(req.body.dataSet), files: filesIds };
  const result = await resultService.addResult(resultBody);
  if (result.status === 'success') {
    logger.info(
      'Insert result success',
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    const taskUpdate = await taskService.updateTasks(taskId, { state: 'Completed', globalStatus: resultBody.gStatus });
    if (taskUpdate.status === 'error') {
      logger.error(
        'Insert result error' + taskUpdate.err.message,
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      return res.status(400).json({ message: taskUpdate.err.message });
    }
    // Cron auto Done ( in autoCancel service)
    taskService.autoCancelCron(taskId);
    return res.status(201).json({ data: result.data });
  } else {
    logger.error(
      'Insert result error' + result.err.message,
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(400).json({ message: result.err.message });
  }
};

//Update a Result
exports.updateResult = async function (req, res) {
  const taskId = req.params.id;
  const body = {...req.body, task: req.params.id };
  const formValidation = await formValidator(taskId, body);
  if (formValidation.error) {
    logger.error(
      'formValidator in update result ' + formValidation.error.message,
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(400).json({ message: formValidation.error.message });
  }
  const result = await resultService.getByTaskId(taskId);
  if (result.status !== 'success'){
    logger.error(
      'getresult by taskId in update result error' + result.err.message,
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(400).json({ message: result.err.message });
  }
  const filesIds = [];
  const resultBody = { ...req.body, dataSet: JSON.parse(req.body.dataSet), files: JSON.parse(req.body.oldFiles) };

  if (req.files.length>0) {
    for (let i = 0; i < req.files.length; i++) {
      filesIds.push(req.files[i].filename);
    }
    resultBody.files = [...JSON.parse(req.body.oldFiles), ...filesIds];
  }
  const updateResult = await resultService.updateResult(
    result.data._id,
    resultBody
  );
  if (updateResult.status === 'success'){
    return res.status(201).json({ data: updateResult.data });
  } else {
    return res
      .status(updateResult.statusCode ? updateResult.statusCode : 400)
      .json({ message: updateResult.err.message });
  }
};

exports.getPreviousResultByTaskId = async function (req, res) {
  const taskId = req.params.id;
  const result = await resultService.getPreviousResultByTaskIDService(taskId);
  if (result.status === 'success') {
    const files64=[];
    result.data.files?.forEach( file => {
      const base64file = toBase64('uploads/' + file);
      if (base64file.status !== 'success'){
        logger.info(
          'get one result file toBase64 error',
          req.route ? req.baseUrl + req.route.path : 'testing',
          req.method ? req.method : 'testing',
          req.ip ? req.ip : 'testing'
        );
      }
      files64.push({
        name: file,
        extension: file.slice(37),
        data: base64file.data ? base64file.data : null
      })
    })
    result.data.files = files64;
    logger.info(
      'get Previous result success',
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res
      .status(result.statusCode)
      .json({ data: result.data, status: result.status });
  } else {
    logger.error(
      'get Previous result error',
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res
      .status(result.statusCode)
      .json({ message: result.err.message, status: result.status });
  }
};
//Get One Result
exports.getOneResult = async function (req, res) {
  const id = req.params.id
  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Object ID' });
  }
  const result = await resultService.getByTaskId(id);
  if (result.status === 'success'){
    const files64=[];
    result.data.files?.forEach( file => {
      const base64file = toBase64('uploads/' + file);
      if (base64file.status !== 'success'){
        logger.error(
          'get one result file toBase64 error',
          req.route ? req.baseUrl + req.route.path : 'testing',
          req.method ? req.method : 'testing',
          req.ip ? req.ip : 'testing'
        );
      }
      files64.push({
        name: file,
        extension: file.slice(37),
        data: base64file.data ? base64file.data : null
      })
    })
    result.data.files = files64;
    logger.info(
      'get one result success',
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(result.statusCode).json({ data: result.data });
  } else {
    logger.error(
      'get one result error',
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(result.statusCode).json({ message: result.err.message });
  }
};

exports.getResultsByMapsId = async function (req, res) {

  const mapsIds = req.body.mapsIds
  const timeZone = req.body.timeZone
  let date;

  if (req.body.date){
    date = toUtc(req.body.date, timeZone);
  } else {
    date = moment().tz(timeZone).endOf('day').format();
    date = toUtc(date, timeZone);
  }

  const result = await resultService.getResultsByMapsId(mapsIds, date);
  if (result.status === 'success') {
  result.data?.forEach( (item) => {
    const files64=[];
    item.result?.forEach( (results) => {
      results.files?.forEach( (file) => {
        const base64file = toBase64('uploads/' + file);
        if (base64file.status !== 'success'){
          logger.error(
            'get one result file toBase64 error',
            req.route ? req.baseUrl + req.route.path : 'testing',
            req.method ? req.method : 'testing',
            req.ip ? req.ip : 'testing'
          );
        }
        files64.push({
          name: file,
          extension: file.slice(37),
          data: base64file.data ? base64file.data : null
        })
        results.files = files64
      })
    })
  })
return res.status(200).json({ data: result.data });
} else {
return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result?.err?.message });
}
};

exports.getResultsById = async function (req, res) {
const id = req.params.id
  const result = await resultService.getOne(id);
  if (result.status === 'success') {
    const files64=[];
    result.data.files?.forEach( file => {
      const base64file = toBase64('uploads/' + file);
      if (base64file.status !== 'success'){
        logger.error(
          'get one result file toBase64 error',
          req.route ? req.baseUrl + req.route.path : 'testing',
          req.method ? req.method : 'testing',
          req.ip ? req.ip : 'testing'
        );
      }
      files64.push({
        name: file,
        extension: file.slice(37),
        data: base64file.data ? base64file.data : null
      })
    })
    result.data.files = files64;
return res.status(200).json({ data: result.data });
} else {
return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
}
};
