//Service Object : contains the business logic CRUD
const mapService = require("../services/map");
const logger = require("../config/logger");
const stringToMinutesDecoder = require('../utils/stringToMinutes')
const moment = require('moment');

//POST Map Controller

exports.addMap = async function (req, res) {
  let payload = {
    periodicity: stringToMinutesDecoder(req.body.periodicity),
    active: req.body.active,
    estimation: stringToMinutesDecoder(req.body.estimation),
    task: req.body.task,
    system: req.body.system,
    monitoringAct: req.body.monitoringAct,
    startTime: stringToMinutesDecoder(moment(moment.tz(req.body.startTime, 'HH:mm', req.query.timeZone)).tz('UTC').format('HH:mm'))
  }

  const result = await mapService.addMAP(payload);
  if (result.status == "success")
    return res.status(201).json({ data: result.data });
  if (result.status == "error")
    return res.status(400).json({ message: result.err.message });
};

//GET ALL Maps Controller

exports.getAllMaps = async function (req, res) {
  let page = req.query.page;
  let size = req.query.size;
  const result = await mapService.getAllMAPsService(page, size);
  if (result.status == "success")
    return res.status(200).json({ data: result.data });
  if (result.status == "error")
    res.status(400).json({ message: result.err.message });
};

//GET Map by Id Controller

exports.getMapById = async function (req, res) {
  const result = await mapService.getMAPById(req.params.id, req.query.timeZone);
  if (result.status === 'success'){
    return res.status(200).json({ data: result.data });
  } else {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//PATCH Map by Id Controller

exports.updateMap = async function (req, res) {

  let payload = {
    periodicity: stringToMinutesDecoder(req.body.periodicity),
    active: req.body.active,
    estimation: stringToMinutesDecoder(req.body.estimation),
    task: req.body.task,
    system: req.body.system,
    monitoringAct: req.body.monitoringAct,
    startTime: stringToMinutesDecoder(moment(moment.tz(req.body.startTime, 'HH:mm', req.query.timeZone)).tz('UTC').format('HH:mm'))
  }

  const resultCreation = await mapService.addMAP(payload);
  if (resultCreation.status == "success") {

    const resultDelete = await mapService.deleteMAP(req.params.id);

    if (resultDelete.status == "success") {
      return res.status(201).json({ data: resultCreation.data });
    }
    
    if (resultDelete.status == "error") {
      return res
        .status(resultDelete.statusCode ? resultDelete.statusCode : 400)
        .json({ message: resultDelete.err.message });
    }
  }
  if (resultCreation.status == "error") {
    return res.status(400).json({ message: resultCreation.err.message });
  }



};

//DELETE Map Controller

exports.deleteMap = async function (req, res) {
  const result = await mapService.deleteMAP(req.params.id);
  if (result.status == "success")
    return res.status(200).json({ data: result.data });
  if (result.status == "error") {
    logger.error(
      "delete Map By Id :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

// get all MAPs by system

exports.getAllMAPBySystem = async (req, res) => {
  let page = req.query.page;
  let size = req.query.size;
  let searchValue = req.query.searchValue ; 
  let timeZone = req.query.timeZone ; 
  const result = await mapService.getBySystemId(req.params.sysId, page, size , searchValue, timeZone);
  if (result.status == "success") {
    return res.status(200).json({ data: result.data });
  } else {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};
