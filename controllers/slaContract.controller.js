const mongoose = require("mongoose");
const slaContractService = require("../services/slaContract");
const customerService = require("../services/customer");
const logger = require("../config/logger");

//Add SlaContract
exports.addSlaContract = async function (req, res) {
  const result = await slaContractService.addSlaContractService(req.body);
  if (result.status == "success") {
    logger.info(
      "add SlaContract success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "add SlaContract :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(400).json({ message: result.err.message });
  }
};

//Get customer slaContracts
exports.getSlaContractByCustomer = async function (req, res) {
  const result = await customerService.getCustomerByIdService(req.params.id, [
    {
      match: { isActive: true },
      path: "listSlaContract",
      populate: { path: "class" },
    },
  ]);
  if (result.status == "success") {
    logger.info(
      "get slaContract By Customer success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data.listSlaContract });
  }
  if (result.status == "error") {
    logger.error(
      "get slaContract By Customer :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Get SlaContract by Id
exports.getSlaContractById = async function (req, res) {
  const result = await slaContractService.getSlaContractByIdService(
    req.params.id,
    [
      { path: "class", select: "libelle" },
      { path: "customer", select: "label" },
    ]
  );
  if (result.status == "success") {
    logger.info(
      "get slaContract By Id success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "get slaContract By Id :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

exports.updateSlaContract = async function (req, res) {
  // if (!req.params.id) {
  //   return res.status(404).json({ message: "missing ID" });
  // }

  const result = await slaContractService.updateSlaContractService(
    req.params.id,
    req.body
  );
  if (result.status == "success") {
    logger.info(
      "update slaContract By Customer success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "update slaContract By Customer :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Delete SlaContract

exports.deleteSlaContract = async function (req, res) {
  const result = await slaContractService.deleteSlaContractService(
    req.params.id
  );
  if (result.status == "success") {
    logger.info(
      "delete slaContract success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "delete SlaContract :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};
//Get All SlaContracts By Customer Id

exports.getAllSlaContractByCustomerId = async function (req, res) {
  let customer_Id = req.params.customer_Id;
  let page = req.query.page;
  let size = req.query.size;
  let searchValue = req.query.searchValue;
  const result = await slaContractService.getAllSlaContractByCustomerId(
    customer_Id,
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
