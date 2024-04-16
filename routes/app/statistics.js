const express = require('express');
const router = express.Router();
const StatisticsController = require('../../controllers/statistics.controller');
const { dbGrowthValidator, activeUsersStatisticsValidator, numberOfSystemsByCustomerValidator, globalStatisticsValidator, listOfTasksByCriteriaValidator, getAllResultHistoryValidator } = require('../../middleware/validators/statistics');

router.get('/dbGrowthStatistics', dbGrowthValidator, StatisticsController.dbGrowthStatistics);
router.get('/activeUsersStatistics', activeUsersStatisticsValidator, StatisticsController.activeUsersStatistics);
router.get('/avgResponseTime', dbGrowthValidator, StatisticsController.AvgResponseTime);
router.get('/listOfTasksByCriteria', listOfTasksByCriteriaValidator, StatisticsController.listOfTasks);
router.get('/numberOfSystems', numberOfSystemsByCustomerValidator, StatisticsController.systemsByCustomer);
router.get('/globalStatistics', globalStatisticsValidator, StatisticsController.globalStatistics);
router.get('/resultHistory', getAllResultHistoryValidator, StatisticsController.getAllResultHistory);

module.exports = router;
