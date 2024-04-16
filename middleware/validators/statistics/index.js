const dbGrowthValidator = require('../../../middleware/validators/statistics/dbGrowthStatistics.validator');
const activeUsersStatisticsValidator = require('../../../middleware/validators/statistics/activeUsersStatisticsValidator');
const listOfTasksByCriteriaValidator = require('../../../middleware/validators/statistics/listTasksByCriteriaValidator')
const numberOfSystemsByCustomerValidator = require('../../../middleware/validators/statistics/numberOfSystemsValidator');
const globalStatisticsValidator = require('../../../middleware/validators/statistics/globalStatisticsValidator');
const getAllResultHistoryValidator = require('../../../middleware/validators/statistics/getAllResultHistoryValidator');

module.exports = {
  dbGrowthValidator,
  activeUsersStatisticsValidator,
  numberOfSystemsByCustomerValidator,
  globalStatisticsValidator,
  listOfTasksByCriteriaValidator,
  getAllResultHistoryValidator
};
