const dbGrowthStatisticsService = require('./dbGrowthStatistics.service');
const activeUsersStatisticsService = require('./activeUsersStatisticsService');
const AvgResponseTimeService = require('./AvgResponseTime.service');
const listOfTasksService = require('./listOfTasksByCriteria');
const numberOfSystemsByCustomer = require('./numberOfSystemsByCustomer');
const getTasksStatsByUserService = require('./getTasksStatsByUser.service');
const getAllResultHistoryService = require('./getAllResultHistoryService');

module.exports = {
  dbGrowthStatisticsService,
  activeUsersStatisticsService,
  AvgResponseTimeService,
  listOfTasksService,
  numberOfSystemsByCustomer,
  getTasksStatsByUserService,
  getAllResultHistoryService
}

