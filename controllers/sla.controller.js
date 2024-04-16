const mongoose = require("mongoose");
const slaService = require("../services/sla");

const logger = require("../config/logger");

//Add Sla
exports.addSla = async function (req, res) {
  const result = await slaService.addSlaService(req.body);
  if (result.status == "success") {
    logger.info(
      "add Sla success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "add Sla :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(400).json({ message: result.err.message });
  }
};

//Get sla by slaContract_Id
exports.getSlaBySlaContract = async function (req, res) {

  let slaContract_Id = req.params.id;
  let page = req.query.page;
  let size = req.query.size;
  let searchValue = req.query.searchValue;

  const result = await slaService.getSlaBySlaContractIdService(
    slaContract_Id,
    page,
    size,
    searchValue
  );
  if (result.status == "success")
    return res.status(200).json({ data: result.data });
  if (result.status == "error")
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
};

//Get Sla by Id
exports.getSlaById = async function (req, res) {
  const result = await slaService.getSlaByIdService(req.params.id);
  if (result.status == "success") {
    logger.info(
      "get sla By Id success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "get sla By Id :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

exports.updateSla = async function (req, res) {
  // if (!req.params.id) {
  //   return res.status(404).json({ message: "missing ID" });
  // }

  const result = await slaService.updateSlaService(req.params.id, req.body);
  if (result.status == "success") {
    logger.info(
      "update sla By SlaContract success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "update sla By SlaContract :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Delete Sla

exports.deleteSla = async function (req, res) {
  const result = await slaService.deleteSlaService(req.params.id);
  if (result.status == "success") {
    logger.info(
      "delete sla success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "delete Sla :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};
