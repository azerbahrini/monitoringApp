const logger = require('./../../config/logger')
const mongoose = require("mongoose");

let updateArray = [];

function updateList(task, result, taskGlobalStatus) {
  try {
    let updateObject = {
      taskId: task,
      resultId: result,
      gStatus: taskGlobalStatus
    };

    updateArray = [...updateArray, updateObject];

    if (updateArray.length > 0) {
      return updateArray;
    }
  } catch (error) {
    logger.error("An error has occured when creating Result update list !");
  }
}

async function looper(tasks) {
  let resultIds;
  let taskId;
  let gStatus;
  let UR = [];

  if (tasks) {
    await tasks.forEach((el) => {
      if (el.resultat.length > 0) {
        taskId = el._id;
        resultIds = el.resultat;
        gStatus = el.globalStatus
        for (const rId of resultIds) {
          UR = updateList(taskId, rId, gStatus);
        }
      }
    });

    if (UR.length > 0) {
      return UR;
    } else {
      logger.info("no matches found for tasks - results migration");
      return [];
    }
  }
}
module.exports = {
  async up(db) {
    try {
      const tasks = await db.collection('tasks').find({resultat: { $elemMatch: {$exists: true}},
        createdAt: {$gte: new Date('2022-01-25')}})
      const loop = await looper(tasks);
      if (loop.length > 0) {
        db.collection('results').bulkWrite(
          loop.map((h) => ({
              updateOne: {
                filter: {
                  _id: h.resultId
                },
                update: {
                  $set: {
                    OldResult: true,
                    task: h.taskId,
                    gStatus: h.gStatus
                  }
                }
              }
            }))
        );
      } else {
        logger.info(
          'there are no data to migrate, no matches have been found - task'
        );
      }
      } catch (error) {
        logger.error('Migration error task/result : ', error)
      }
  },

  async down(db) {
}
}