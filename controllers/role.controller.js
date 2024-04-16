const roleService = require("../services/role");
const logger = require("../config/logger");

//Add Role
exports.addRole = async function (req, res) {
  const result = await roleService.addRoleService(req.body);
  if (result.status == "success") {
    logger.info(
      "add Role success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "add Role :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(400).json({ message: result.err.message });
  }
};

//Get All Role
exports.getAllRole = async function (req, res) {
  const paginate = (req.query.paginate==="true");
  const page = req.query.page;
  const size = req.query.size;
  let searchValue = req.query.searchValue
  let isActive = req.query?.isActive
  let activeFilterObject = {}

  if(typeof isActive !== 'undefined')
    {
      activeFilterObject = {isActive: isActive}
    }



  const conditions ={
    ...activeFilterObject,
    label: {$ne: "Team Leader" , $regex: searchValue ? searchValue : ".", $options: "i"  } ,
  };

  const result = await roleService.getAllRoleService(paginate,page, size,conditions , searchValue);
  if (result.status == "success") {
    logger.info(
      "get All Role success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "get All Role :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(400).json({ message: result.err.message });
  }
};

//Get Role by Id
exports.getRoleById = async function (req, res) {
  const result = await roleService.getRoleByIdService(req.params.id);
  if (result.status == "success") {
    logger.info(
      "get by id Role success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "get by id Role :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

exports.updateRole = async function (req, res) {
  const result = await roleService.updateRoleService(req.params.id, req.body);
  if (result.status == "success") {
    logger.info(
      "update Role success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "update Role :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Delete Role

exports.deleteRole = async function (req, res) {
  const result = await roleService.deleteRoleService(req.params.id);
  if (result.status == "success") {
    logger.info(
      "delete Role success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "delete Role :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//get all user roles
exports.getRolesByuser = async function (req, res) {
  const result = await roleService.getAllRoleByUser(
    req.query.id,
    req.query.date,
    req.query.type
  );
  if (result.status == "success") {
    logger.info(
      "get by user Role success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "get by user Role :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};
