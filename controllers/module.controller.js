const moduleService = require("../services/module");
const logger = require("../config/logger");

//Add Module
exports.addModule = async function (req, res) {
  const result = await moduleService.addModuleService(req.body);
  if (result.status == "success"){
  logger.info("add Module success",req.route? req.baseUrl+req.route.path:"testing", req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
  logger.error("add Module :"+result.err.message, req.route? req.baseUrl+req.route.path:"testing",  req.method?req.method:"testing", req.ip ? req.ip :"testing");
  return res.status(400).json({ message: result.err.message});
  }
};

//Get All Basic Module
exports.getAllBasicModule = async function (req, res) {
  let page = req.query.page
  let size = req.query.size
  const result = await moduleService.getAllModuleService(page, size, true);
  if (result.status == "success"){
    logger.info("get All Basic Module success",req.route? req.baseUrl+req.route.path:"testing", req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error"){
    logger.error("get All Basic Module :"+result.err.message, req.route? req.baseUrl+req.route.path:"testing",  req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res.status(400).json({ message: result.err.message });
  }
};

//Get All Module
exports.getAllModule = async function (req, res) {
  let page = req.query.page
  let size = req.query.size
  let searchValue = req.query.searchValue
  const result = await moduleService.getAllModuleService(page, size ,false,searchValue);
  if (result.status == "success"){
    logger.info("get All Module success",req.route? req.baseUrl+req.route.path:"testing", req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error"){
    logger.error("get All Module :"+result.err.message, req.route? req.baseUrl+req.route.path:"testing",  req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res.status(400).json({ message: result.err.message });
  }
};

//Get Module by Id
exports.getModuleById = async function (req, res) {
  const result = await moduleService.getModuleByIdService(req.params.id,[{path:"listPermission"}]);
  if (result.status == "success"){
    logger.info("get module By Id success", req.route? req.baseUrl+req.route.path:"testing", req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error("get module By Id :"+result.err.message, req.route? req.baseUrl+req.route.path:"testing", req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res
    .status(result.statusCode ? result.statusCode : 400)
    .json({ message: result.err.message });
  }
};

exports.updateModule = async function (req, res) {

  const result = await moduleService.updateModuleService(req.params.id, req.body);
  if (result.status == "success"){
    logger.info("update module By Customer success", req.route? req.baseUrl+req.route.path:"testing", req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error"){
      logger.error("update module By Customer :"+result.err.message, req.route? req.baseUrl+req.route.path:"testing", req.method?req.method:"testing", req.ip ? req.ip :"testing");
  return res
  .status(result.statusCode ? result.statusCode : 400)
  .json({ message: result.err.message });
  }
};

//Delete Module

exports.deleteModule = async function (req, res) {
  const result = await moduleService.deleteModuleService(req.params.id);
  if (result.status == "success"){
    logger.info("delete module success", req.route? req.baseUrl+req.route.path:"testing", req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error("delete Module :"+result.err.message, req.route? req.baseUrl+req.route.path:"testing", req.method?req.method:"testing", req.ip ? req.ip :"testing");
    return res.status(result.statusCode ? result.statusCode : 400)
    .json({ message: result.err.message });
  }
};
