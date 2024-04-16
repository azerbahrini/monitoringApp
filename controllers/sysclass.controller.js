//Service Object : contains the business logic CRUD
const sysClassService = require("../services/sysclass");

//POST System Class Controller

exports.addClass = async function (req, res) {
  const result = await sysClassService.addSysClassService(req.body);
  if (result.status == "success")
    return res.status(201).json({ data: result.data });
  if (result.status == "error")
    return res.status(400).json({ message: result.err.message });
};

//GET ALL System Class Controller

exports.getAllClass = async function (req, res) {
  let page = req.query.page
  let size = req.query.size
  let isActive = req.query?.isActive;
  let searchValue = req.query.searchValue
  let activeFilterObject = {} ;
  if(typeof isActive !== 'undefined') {
    activeFilterObject = {isActive: isActive} ;
  }

  const result = await sysClassService.getAllSysClassService(page, size,activeFilterObject,searchValue);
  if (result.status == "success")
    return res.status(200).json({ data: result.data });
  if (result.status == "error")
    res.status(400).json({ message: result.err.message });
};

//GET System Class by Id Controller

exports.getClassById = async function (req, res) {
  const result = await sysClassService.getSysClassByIdService(req.params.id);
  if (result.status == "success")
    return res.status(200).json({ data: result.data });
  if (result.status == "error")
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
};

//PATCH System Class by Id Controller

exports.updateSystemClass = async function (req, res) {
  const filter = {
    _id: req.params.id,
  };
  const result = await sysClassService.updateSysClassService(filter, req.body);
  if (result.status == "success")
    return res.status(201).json({ data: result.data });
  if (result.status == "error")
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
};

//DELETE System Class Controller

exports.deleteClass = async function (req, res) {
  const result = await sysClassService.deleteSysClassService(req.params.id);
  if (result.status == "success")
    return res.status(200).json({ data: result.data });
  if (result.status == "error")
    return res.status(400).json({ message: result.err.message });
};
