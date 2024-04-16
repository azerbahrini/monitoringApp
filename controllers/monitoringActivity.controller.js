const MonitoringActivitySerivce = require("../services/monitoringActivity");

//Add Activity
exports.addActivity = async function (req, res) {
  const result = await MonitoringActivitySerivce.addMonitoringActivityService(
    req.body
  );
  if (result.status == "success") res.status(201).json({ data: result.data });
  if (result.status == "error")
    res.status(400).json({ message: result.err.message });
};

exports.updateMonitoringActivity = async function (req, res) {
  const filter = {
    _id: req.params.id,
  };

  const result =
    await MonitoringActivitySerivce.updateMonitoringActivityService(
      filter,
      req.body
    );
  if (result.status == "success") res.status(201).json({ data: result.data });
  if (result.status == "error")
    res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
};

//Get Allactivities
exports.getAllactivities = async function (req, res) {
  let pagination = req.query.paginate
  let page = req.query.page
  let size = req.query.size
  let searchValue = req.query.searchValue


  let isActive = req.query?.isActive

  let activeFilterObject = {}
  if(typeof isActive !== 'undefined')
    {
      activeFilterObject = {isActive: isActive}
    }

  const result =
    await MonitoringActivitySerivce.getAllMonitoringActivityService(pagination, page, size,activeFilterObject,searchValue);
  if (result.status == "success") res.status(200).json({ data: result.data });
  if (result.status == "error")
    res.status(400).json({ message: result.err.message });
};


//Get Allactivities
exports.getNotAssignedActivity = async function (req, res) {
  let systemId=req.params.systemId;
  const result =
    await MonitoringActivitySerivce.getNotAssignedActivityService(systemId);
  if (result.status == "success"){ res.status(200).json({ data: result.data });
  } else {
  res
    .status(result.statusCode ? result.statusCode : 400)
    .json({ message: result.err.message });
}

};

