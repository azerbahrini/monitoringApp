const StatisticsService = require('../services/statistics');

exports.dbGrowthStatistics = async function (req, res) {
 const { startDate, endDate, systemID = null, timeZone } = req.query;
 let { customerID = null } = req.query;
    if (systemID !== null) {
        customerID = null;
    }
    const result = await StatisticsService.dbGrowthStatisticsService(startDate, endDate, customerID, systemID, timeZone);
    if (result.status === 'success') {
        res.status(result.statusCode).json(result.data);
    } else {
        res.status(result.statusCode).json({ message: result.err.message });
    }
};

exports.activeUsersStatistics = async function (req, res) {
    const { startDate, endDate, systemID = null, timeZone } = req.query;
    let { customerID = null } = req.query;
       if (systemID !== null) {
           customerID = null;
       }
       const result = await StatisticsService.activeUsersStatisticsService(startDate, endDate, customerID, systemID, timeZone);
       if (result.status === 'success') {
           res.status(result.statusCode).json({data: result.data});
       } else {
           res.status(result.statusCode).json({ message: result.err.message });
       }
   };
exports.AvgResponseTime = async function (req, res) {
    const { startDate, endDate, systemID = null, timeZone } = req.query;
    let { customerID = null } = req.query;
    if (systemID !== null) {
      customerID = null;
    }
  const result = await StatisticsService.AvgResponseTimeService(startDate, endDate, customerID, systemID, timeZone);
  if (result.status === 'success') {
    res.status(result.statusCode).json(result.data);
  } else {
    res.status(result.statusCode).json({ message: result.err.message });
  }
};

exports.listOfTasks = async function (req, res) {
  const {globalStatus = null, state = null, startDate = null, endDate = null, systemID = null, assigneeId = null, customerId=null, searchValue, timeZone } = req.query;
const result = await StatisticsService.listOfTasksService(timeZone, customerId, globalStatus, state, startDate, endDate, assigneeId, systemID, searchValue);
if (result.status === 'success') {
  res.status(result.statusCode).json({data: result.data});
} else {
  res.status(result.statusCode).json({ message: result.err.message });
}
};
//number of systems by customer
exports.systemsByCustomer = async function (req, res) {
 const startDate = req.query.startDate
 const endDate = req.query.endDate
 const customerID = req.query.customerID
 const timeZone = req.query.timeZone
const result = await StatisticsService.numberOfSystemsByCustomer(startDate, endDate, customerID, timeZone);
if (result.status === 'success') {
  res.status(result.statusCode).json({data: result.data[0]});
} else {
  res.status(result.statusCode).json({ message: result.err?.message });
}
};

exports.globalStatistics = async function (req, res) {
  const { UserID, startDate, endDate, systemID = null, timeZone } = req.query;
  let { customerID = null } = req.query;
  if (systemID !== null) {
    customerID = null;
  }
  const result = await StatisticsService.getTasksStatsByUserService(UserID, startDate, endDate, customerID, systemID, timeZone);
  if (result.status === 'success') {
    res.status(result.statusCode).json(result.data);
  } else {
    res.status(result.statusCode).json({ message: result.err.message });
  }
}

exports.getAllResultHistory = async function (req, res) {
  const { customerId, startDate, endDate, systemId, mapId, timeZone } = req.query;
  const result = await StatisticsService.getAllResultHistoryService(customerId, systemId, mapId, startDate, endDate, timeZone);
  if (result.status === 'success') {
    res.status(result.statusCode).json(result.data);
  } else {
    res.status(result.statusCode).json({ message: result.err.message });
  }
}
