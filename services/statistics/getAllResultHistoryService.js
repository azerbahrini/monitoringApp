const Result = require('../../models/Result');
const ObjectId = require('mongodb').ObjectId;
const moment = require('moment-timezone')

module.exports = async (customerId, systemId, mapId, startDate, endDate, timeZone) => {

  try {
    const convertedStartDate = new Date(toUtc(moment(startDate).tz(timeZone).format(), timeZone));
    const convertedEndDate = new Date(toUtc(moment(endDate).tz(timeZone).format(), timeZone));

    const stats = await Result.aggregate([

        {
          '$lookup': {
            'from': 'tasks',
            'localField': 'task',
            'foreignField': '_id',
            'as': 'populatedTask'
          }
        }, {
          '$unwind': {
            'path': '$populatedTask'
          }
        }, {
          '$lookup': {
            'from': 'systems',
            'localField': 'populatedTask.system',
            'foreignField': '_id',
            'as': 'populatedSystem'
          }
        }, {
          '$set': {
            'customerId': {
              '$arrayElemAt': ['$populatedSystem.customer', 0]
            },
            'systemId': '$populatedTask.system',
            'mapId': '$populatedTask.map',
            'state': '$populatedTask.state',
            'result': '$dataSet'
          }
        },
      {
        $match: {
             'customerId': new ObjectId(customerId),
             'mapId': new ObjectId(mapId),
             'systemId': new ObjectId(systemId)
        }
      },
      {
        $match: {
          $and: [
            {
              createdAt: {$gte: convertedStartDate}
            },
            {
                createdAt: {$lte: convertedEndDate}
            }
          ]
        }
      },
      {
        '$project': {
          'state': 1,
          'createdAt': 1,
         'gStatus': 1,
          'result': 1
        }
      }
    ]);
    stats?.map((result) => {
      result.createdAt = moment(result?.createdAt).tz(timeZone).format();
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