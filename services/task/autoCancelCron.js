const cron = require('cron').CronJob;
const Task = require('../../models/Task');
const updateTasks = require('./updateTasks');
const logger = require('../../config/logger');
const moment = require('moment');

module.exports = async (id) => {
  try {
    const currentTask = await Task.findOne({ _id: id }).lean().exec();
    const cancelDateTime = moment(currentTask.estimatedStart).utc().add(2, 'h');
    const job = new cron(
      cancelDateTime,
      async function () {
        const task = await Task.findOne({ _id: id }).lean().exec();
        if (task?.state === 'In progress' || task?.state === 'To be validated') {
          task.state = 'Canceled';
          const canceledTask = await updateTasks(id, task);
          if (canceledTask.status === 'success') {
            logger.info('Auto Canceled the Task');
            logger.info(`Task state change sent with socket!`);
          } else {
            logger.error('Failed to Auto-Cancel the Task');
          }
        } else if (task?.state === 'Completed'){
          task.state = 'Done';
          const doneTask = await updateTasks(id, task);
          if (doneTask.status === 'success') {
            logger.info('Auto Done the Task');
          } else {
            logger.error('Failed to Auto-Done the Task');
          }
        }
        // console.log('stopped the crone at');
        // console.log(new Date().toLocaleString());
        // console.log('stopped the crone at');
      },
      null,
      true,
      'UTC'
    );
    // console.log('started the crone at');
    // console.log(new Date().toLocaleString());
    // console.log('started the crone at');
    job.start();
    logger.info('Auto cancel/Done Task cron launched');

  } catch (error) {
    logger.error('An unexpected error occurred', error);
  }
};
