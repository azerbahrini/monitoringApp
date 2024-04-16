const Task = require('../../models/Task');
const ObjectId = require('mongodb').ObjectId;
const moment = require('moment-timezone')
const toUtc = require('../../utils/toUTC')

module.exports = async (timeZone, customerId, globalStatus, state,
  startDate, endDate, assigneeId, systemID, searchValue) => {

  try {
    const convertedStartDate = new Date(toUtc(moment(startDate).tz(timeZone).format(), timeZone));
    const convertedEndDate = new Date(toUtc(moment(endDate).tz(timeZone).format(), timeZone));

    const stats = await Task.aggregate([
{
      $lookup: {
          from: 'systems',
          localField: 'system',
          foreignField: '_id',
          as: 'populatedSystem'
      }
  }, {
      $set: {
          'customerId': {
              '$arrayElemAt': ['$populatedSystem.customer', 0]
          }
      }
  }, {
      $project: {
          'populatedSystem': 0
      }
  },
      {
        $match: {
             'customerId': customerId !== null ? new ObjectId(customerId) : { $ne: null },
             'assignee': assigneeId !== null ? new ObjectId(assigneeId) : { $ne: null },
             'system': systemID!== null ? new ObjectId(systemID) : { $ne: null },
             'globalStatus': globalStatus !== null ? globalStatus : { $ne: null },
             'state': state!== null ? state : { $ne: null },
             'title': { $regex: searchValue ? searchValue : '', $options: 'i' }
        }
      },
      {
        $match: {
          $and: [
            {
              estimatedStart: startDate ? {$gte: convertedStartDate} : { $ne: null }
            },
            {
              estimatedStart: endDate ? {$lte: convertedEndDate} : { $ne: null }
            }
          ]
        }
      }
    ]);
    stats?.map((task) => {
      task.estimatedStart = moment(task?.estimatedStart).tz(timeZone).format();
    })

    if (stats.length === 0) {
      return {
        status: 'success',
        statusCode: 204,
        err: { message: 'No data can be found' }
      };
    }
    return { data: stats, status: 'success', statusCode: 200 };
  } catch (err) {
    return { err, status: 'error', statusCode: 400 };
  }
};