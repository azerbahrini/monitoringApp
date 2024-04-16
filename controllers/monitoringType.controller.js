const MonitoringType = require("../models/MonitoringType");
const monitoringTypeService = require("../services/monitoringType");

//Add Monitoring Type
exports.addMonitoringType = async function (req, res) {
  const doc = await monitoringTypeService.addMonitoringType(req.body);
  if (doc.status == "success") return res.status(201).json({ data: doc.data });
  if (doc.status == "error")
    return res.status(400).json({ message: doc.err.message });
};

//Get All Monitoring Types
exports.getAllMonitoringType = async function (req, res) {
  const page = req.query.page;
  const size = req.query.size;
  const isActive = req.query.isActive ?? null;
  let searchValue = req.query.searchValue
  const doc = await monitoringTypeService.getAllMonitoringTypeService(page, size, isActive , searchValue);

  if (doc.status == "success") return res.status(200).json({ data: doc.data });
  if (doc.status == "error") res.status(400).json({ message: doc.err.message });
};

//Get Monitoring Type by Id
exports.getMonitoringTypeById = async function (req, res) {
  const doc = await monitoringTypeService.getMonitoringTypeById(req.params.id);

  if (doc.status == "success") return res.status(200).json({ data: doc.data });
  if (doc.status == "error") res.status(400).json({ message: doc.err.message });
};

//Update Monitoring Type
exports.updateMonitoringType = async function (req, res) {
  const filter = {
    _id: req.params.id,
  };

  const doc = await monitoringTypeService.updateMonitoringType(
    filter,
    req.body
  );
  if (doc.status == "success") return res.status(201).json({ data: doc.data });
  if (doc.status == "error")
    return res
      .status(doc.statusCode ? doc.statusCode : 400)
      .json({ message: doc.err.message });
};

//Delete Monitoring Type

exports.deleteIMonitoringType = async function (req, res) {
  const docDel = await monitoringTypeService.deleteMonitoringType(
    req.params.id
  );

  if (docDel.status == "success")
    return res.status(200).json({ data: docDel.data });
  if (docDel.status == "error")
    return res.status(400).json({ message: docDel.err.message });
};
