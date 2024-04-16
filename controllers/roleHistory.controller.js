
const roleHistoryServices = require("../services/roleHistory");
const logger = require("../config/logger");

//Add Role History
exports.addRoleHistoryController = async function (req, res) {
  const result = await roleHistoryServices.addRoleHistoryService(req.body);
  if (result.status == "success") {
    logger.info(
      "add Role History success",
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
    return res.status(400).json({ message: result.err.message });
  }
};

//Get Role History by Id
exports.getRoleHistoryByIdController = async function (req, res) {
  const result = await roleHistoryServices.getRoleHistoryByIdService(req.params.id);

  if (result.status == "success")
    return res.status(200).json({ data: result.data });
  if (result.status == "error")
    res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
};


//Get All Role History
exports.getAllRoleHistoryController = async function (req, res) {
  let page = req.query.page
  let size = req.query.size
  const result = await roleHistoryServices.getAllRoleHistoryService(page, size);

  if (result.status == "success")
    return res.status(200).json({ data: result.data });
  if (result.status == "error")
    return res.status(400).json({ message: result.err.message });
};

//update Role History
exports.updateRoleHistoryController= async function (req, res) {
  const result = await roleHistoryServices.updateRoleHistoryService(req.body, req.params.id);

  if (result.status == "success")
    return res.status(201).json({ data: result.data });
  if (result.status == "error")
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
};
