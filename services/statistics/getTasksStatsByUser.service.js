const Task = require('../../models/Task');
const ObjectId = require('mongodb').ObjectId;
const moment = require('moment-timezone');
const toUtc = require('../../utils/toUTC')

module.exports = async (UserID, startDate, endDate, customerID, systemID, timeZone) => {
  const bothAreNull = customerID === null && systemID === null;
  try {
    const convertedStartDate = new Date(toUtc(moment(startDate).tz(timeZone).format(), timeZone));
    const convertedEndDate = new Date(toUtc(moment(endDate).tz(timeZone).format(), timeZone));

    const result = await Task.aggregate([
      {
        $match: {
          assignee: new ObjectId(UserID),
          updatedAt: {
            $gte: convertedStartDate,
            $lte: convertedEndDate
          }
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
        $project: {
          state: 1,
          'system.customer': 1,
          'system._id': 1,
          createdAt: 1,
          updatedAt: 1
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
          systemID: 0,
          customerID: 0
        }
      },
      {
        $set: {
          'item.state': '$state',
          'item.createdAt': '$createdAt',
          'item.updatedAt': '$updatedAt'
        }
      },
      {
        $group: {
          _id: '',
          tasks: {
            $push: '$item'
          },
          totalAffected: {
            $sum: 1
          },
          Pending: {
            $sum: {
              $cond: [
                {
                  $eq: ['$state', 'Pending']
                },
                1,
                0
              ]
            }
          },
          Rejected: {
            $sum: {
              $cond: [
                {
                  $eq: ['$state', 'Pending']
                },
                1,
                0
              ]
            }
          },
          In_progress: {
            $sum: {
              $cond: [
                {
                  $eq: ['$state', 'Pending']
                },
                1,
                0
              ]
            }
          },
          Canceled: {
            $sum: {
              $cond: [
                {
                  $eq: ['$state', 'Canceled']
                },
                1,
                0
              ]
            }
          },
          Done: {
            $sum: {
              $cond: [
                {
                  $eq: ['$state', 'Done']
                },
                1,
                0
              ]
            }
          },
          Completed: {
            $sum: {
              $cond: [
                {
                  $eq: ['$state', 'Completed']
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $set: {
          'stats.totalAffected': '$totalAffected',
          'stats.Pending': '$Pending',
          'stats.Rejected': '$Rejected',
          'stats.In_progress': '$In_progress',
          'stats.Canceled': '$Canceled',
          'stats.Done': '$Done',
          'stats.Completed': '$Completed'
        }
      },
      {
        $project: {
          _id: 0,
          tasks: 1,
          stats: 1
        }
      }
    ]);
    if (result.length === 0) {
      return {
        status: 'success',
        statusCode: 204,
        err: { message: 'No data can be found' }
      };
    }
    return { data: result[0], status: 'success', statusCode: 200 };
  } catch (err) {
    return { err, status: 'error', statusCode: 400 };
  }
};
