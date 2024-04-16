const Task = require('../../models/Task');
const ObjectId = require('mongodb').ObjectId;
const moment = require('moment-timezone');
const toUtc = require('../../utils/toUTC')

module.exports = async (startDate, endDate, customerID, systemID, timeZone) => {
  const bothAreNull = customerID === null && systemID === null;
  try {
    const convertedStartDate = new Date(toUtc(moment(startDate).tz(timeZone).format(), timeZone));
    const convertedEndDate = new Date(toUtc(moment(endDate).tz(timeZone).format(), timeZone));

    const stats = await Task.aggregate(
      [
        {
          $match: {
            title: 'Response Time'
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
            path: '$system',
            preserveNullAndEmptyArrays: false
          }
        },
        {
          $project: {
            _id: 1,
            'system._id': 1,
            'system.customer': 1
          }
        },
        {
          $addFields: {
            systemID: '$system._id',
            customerID: '$system.customer'
          }
        },
        {
          $project: {
            system: 0
          }
        },
        {
          $lookup: {
            from: 'results',
            localField: '_id',
            foreignField: 'task',
            as: 'result'
          }
        },
        {
          $unwind: {
            path: '$result',
            preserveNullAndEmptyArrays: false
          }
        },
        {
          $match: {
            'result.createdAt': {
              $gte: convertedStartDate,
              $lte: convertedEndDate
            }
          }
        },
        {
          $unwind: {
            path: '$result.dataSet',
            preserveNullAndEmptyArrays: false
          }
        },
        {
          $addFields: {
            createdAt: '$result.createdAt',
            responseTime: '$result.dataSet.responseTime'
          }
        },
        {
          $match: {
            $or: [
              {
                systemID: !bothAreNull ? new ObjectId(systemID) : { $ne: null }
              },
              {
                customerID: !bothAreNull
                  ? new ObjectId(customerID)
                  : { $ne: null }
              }
            ]
          }
        },
        {
          $project: {
            _id: 0,
            result: 0,
            systemID: 0,
            customerID: 0
          }
        }
      ]
    );
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
