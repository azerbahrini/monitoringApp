const mongoose = require("mongoose");
const licenceService = require("../services/licence");
const logger = require("../config/logger");

//Add Licence
exports.addLicence = async function (req, res) {
  const result = await licenceService.addLicenceService(req.body);
  if (result.status == "success") {
    logger.info(
      "add Licence success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "add Licence :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(400).json({ message: result.err.message });
  }
};

//Get customer licences

exports.getLicenceByCustomer = async function (req, res) {
  let customer_Id = req.params.id;
  let page = req.query.page;
  let size = req.query.size;
  let searchValue = req.query.searchValue;

  const result = await licenceService.getLicenceByCustomerService(
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

//Get Licence by Id
exports.getLicenceById = async function (req, res) {
  const result = await licenceService.getLicenceByIdService(req.params.id);
  if (result.status == "success") {
    logger.info(
      "get licence By Id success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "get licence By Id :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

exports.updateLicence = async function (req, res) {
  const result = await licenceService.updateLicenceService(
    req.params.id,
    req.body
  );
  if (result.status == "success") {
    logger.info(
      "update licence By Customer success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "update licence By Customer :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Delete Licence

exports.deleteLicence = async function (req, res) {
  const result = await licenceService.deleteLicenceService(req.params.id);
  if (result.status == "success") {
    logger.info(
      "delete licence success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "delete Licence :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};


//Get Lates Licence For Customer by Customer ID
exports.getLatesLicenceByCustomerId = async function (req, res) {
  const result = await licenceService.latestCustomerLicence(req.params.id);
  if (result.status == "success") {
    logger.info(
      "get latest customer licence By Id success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "get licence By Id :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};