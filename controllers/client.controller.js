const Client = require("../models/Client");
const clientService = require("../services/client");
const logger = require("../config/logger");
//Add Client
exports.addClient = async function (req, res) {
  const result = await clientService.addClient(req.body);
  if (result.status == "success") {
    logger.info(
      "add Client success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "add Client :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Get Client by Id
exports.getClientById = async function (req, res) {
  const result = await clientService.getClientById(req.params.id);

  if (result.status == "success")
    return res.status(200).json({ data: result.data });
  if (result.status == "error")
    res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
};

//Get All Clients
exports.getAllClients = async function (req, res) {
  let page = req.query.page;
  let size = req.query.size;
  const result = await clientService.getAllClients(page, size);

  if (result.status == "success")
    return res.status(200).json({ data: result.data });
  if (result.status == "error")
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
};

//update Client
exports.updateClient = async function (req, res) {
  const result = await clientService.updateClient(req.body, req.params.id);

  if (result.status == "success")
    return res.status(201).json({ data: result.data });
  if (result.status == "error")
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
};

//Delete Client
exports.deleteClient = async function (req, res) {
  const result = await clientService.deleteClient(req.params.id);
  if (result.status == "success")
    return res.status(201).json({ data: result.data });

  if (result.status == "error")
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
};
exports.getCategoryByType = async function (req, res) {
  const result = await clientService.getCategoryByType();
  if (result.status == "success")
    return res.status(201).json({ data: result.data });
  if (result.status == "error")
    return res.status(400).json({ message: result.err.message });
};
exports.getTypeByCategory = async function (req, res) {
  const result = await clientService.getTypeByCategory();
  if (result.status == "success")
    return res.status(201).json({ data: result.data });
  if (result.status == "error")
    return res.status(400).json({ message: result.err.message });
};
// exports.getTypeByCategory = async function (req, res) {
//   const result = await clientService.getTypeByCategory();
//   if (result.status == "success")
//     return res.status(201).json({ data: result.data });
//   if (result.status == "error")
//     return res.status(400).json({ message: result.err.message });
// };

//Get All Clients by System Id

exports.getClientsBySystemId = async function (req, res) {
  let sysId = req.params.sysId;
  let searchValue = req.query.searchValue
  const result = await clientService.getClientsBySystemId(sysId , searchValue);

  if (result.status == "success")
    return res.status(200).json({ data: result.data });
  if (result.status == "error")
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
};
