const Task = require('../../models/Task');
const systemService = require('../system');
const mapService = require('../map');
const shiftService = require('../shift');

const virtualTasksGeneratorService = require('../task/virtualTasksGenerator');
const moment = require('moment');
const saveTaskActivity = require('./saveTaskActivity.service');

function getSystemsWithoutDuplicate(array) {
  const systems = array.map((item) => JSON.stringify(item.system));
  return [...new Set(systems)].map((item) => JSON.parse(item));
}

function calculateSystemOccurence(array, system) {
  return array.reduce(
    (a, v) => (v.system._id.toString() === system.toString() ? a + 1 : a),
    0
  );
}
function calculateCanceledTasks(array, system) {
  return array.reduce(
    (a, v) =>
      v.system._id.toString() === system.toString() &&
      v.state.toString() === 'Canceled'
        ? a + 1
        : a,
    0
  );
}

module.exports = async (timeZone, userId) => {
  try {
    const shiftResult = await shiftService.getShiftByUserIDService(userId);
    const shift = shiftResult.data;
    const startDate = moment(shiftResult.data?.startDate).utc().format();
    const endDate = moment(shiftResult.data?.endDate).utc().format();

    const systems = await systemService.getSystemsForMapsService();
    // Array of system IDs
    const systemsIDs = systems.data.map((system) => system._id);
    const mapsFromSystems = await mapService.getMapsBySystems(systemsIDs);
    //  GeneratedTasks == total tasks
    const generatedTasks = virtualTasksGeneratorService(
      mapsFromSystems.data,
      startDate,
      endDate,
      userId,
      timeZone
    );
    const dbTasks = await Task.aggregate([
      {
        $match: {
          $and: [
            {
              estimatedStart: {
                $lt: new Date(endDate)
              }
            },
            {
              estimatedStart: {
                $gt: new Date(startDate)
              }
            }
          ]
        }
      },
      {
        $project: {
          _id: 1,
          system: 1,
          state: 1
        }
      },
      {
        $lookup: {
          from: 'systems',
          localField: 'system',
          foreignField: '_id',
          as: 'system'
        }
      },
      {
        $unwind: {
          path: '$system'
        }
      },
      {
        $lookup: {
          from: 'customers',
          localField: 'system.customer',
          foreignField: '_id',
          as: 'customer'
        }
      },
      {
        $unwind: {
          path: '$customer'
        }
      },
      {
        $set: {
          'customer.name': '$customer.label',
          taskId: '$_id'
        }
      },
      {
        $project: {
          _id: 0,
          'customer._id': 1,
          'customer.name': 1,
          'system._id': 1,
          'system.name': 1,
          state: 1,
          taskId: 1
        }
      }
    ]);
    const uniqueGeneratedTasks = getSystemsWithoutDuplicate(
      generatedTasks.data
    );
    const total = uniqueGeneratedTasks.map((item) => {
      const virtualOccurence = calculateSystemOccurence(
        generatedTasks.data,
        item._id
      );
      const databaseOccurence = calculateSystemOccurence(dbTasks, item._id);
      const canceledTasks = calculateCanceledTasks(dbTasks, item._id);
      return {
        systemName: item.name,
        customerName: item.customer.label,
        targetTasks: virtualOccurence,
        createdTasks: databaseOccurence,
        canceledTasks: canceledTasks
      };
    });
    if (total.length > 0) {
      const saveResult = await saveTaskActivity(total, shift);
      if (saveResult.status === 'error') {
        return {
          status: 'error',
          message: saveResult.err
        };
      }
      return {
        data: {
          result: total,
          shift: {
            name: shift.name,
            start: moment(shift.startDate).format('YYYY-MM-DD HH:mm'),
            end: moment(shift.endDate).format('YYYY-MM-DD HH:mm')
          }
        },
        status: 'success',
        statusCode: 200
      };
    } else {
      return {
        err: { message: 'No data can be found.' },
        statusCode: 204,
        status: 'success'
      };
    }
  } catch (err) {
    return { err, status: 'error', statusCode: 400 };
  }
};
