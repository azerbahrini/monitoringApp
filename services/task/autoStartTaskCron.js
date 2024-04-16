const CronJob = require('cron').CronJob;
const updateTaskService = require('./updateTasks');
const autoCancelCron = require('./autoCancelCron');
const logger = require('../../config/logger');
const moment = require('moment');

module.exports = (task) => {
  try {
    if (task) {
      const startDateTime = moment(task.estimatedStart).utc();
      if (task.state === 'In progress' || task.state === 'To be validated') {
        autoCancelCron(task._id);
      } else if (task.state === 'Pending'){
      const job = new CronJob(
        startDateTime,
        async function () {
          if (task.state === 'Pending') {
            const body = {
              state: 'In progress'
            };
            const startedTask = await updateTaskService(task._id, body);
            if (startedTask.status === 'success') {
              logger.info('Auto start Task success');
              logger.info('Task state change sent with socket!');
              autoCancelCron(task._id);
            } else {
              logger.error('Auto-Start Task Failed');
            }
          }
        },
        null,
        true,
        'UTC'
      );
      job.start();
      logger.info('Auto start Task cron launched');
      }
    }
  } catch (error) {
    logger.error('An unexpected error occurred during auto start task', error);
  }
};
