const Type = require("../models/Type");
const typeService = require("../services/type");
//Add Type
exports.addType = async function (req, res) {
  const result = await typeService.addTypeService(req.body);
  if (result.status == "success") res.status(201).json({ data: result.data });
  if (result.status == "error")
    res.status(400).json({ message: result.err.message });
};

//Get All Types
exports.getAllType = async function (req, res) {
  let page = req.query.page
  let size = req.query.size
  let isActive = req.query?.isActive
  let searchValue = req.query.searchValue
  let activeFilterObject = {}
  if(typeof isActive !== 'undefined')
    {
      activeFilterObject = {isActive: isActive}
    }

  const result = await typeService.getAllTypeService(page, size , activeFilterObject , searchValue);
  if (result.status == "success") res.status(200).json({ data: result.data });
  if (result.status == "error")
    res.status(400).json({ message: result.err.message });
};
//Get type by Id
exports.getTypeById = async function (req, res) {
  const result = await typeService.getByIdTypeService(req.params.id);
  if (result.status == "success") res.status(200).json({ data: result.data });
  if (result.status == "error")
    res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
};

exports.updateSystemType = async function (req, res) {
  const filter = {
    _id: req.params.id,
  };
  const result = await typeService.updateTypeService(filter, req.body);
  if (result.status == "success") res.status(201).json({ data: result.data });
  if (result.status == "error")
    res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
};
