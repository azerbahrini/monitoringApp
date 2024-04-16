const System = require('../../models/System');
const mongoose = require('mongoose');
const moment = require('moment')
module.exports = async (customerId) => {
    try {
      const dateRange = moment().subtract(1, 'days').format('YYYY-MM-DD')
      const systemsInfo = await System.aggregate([
        {
          '$match': {
            '$and': [
              {
                'customer': mongoose.Types.ObjectId(customerId)
              }, {
                'isActive': true
              }
            ]
          }
        }, {
          '$lookup': {
            'from': 'tasks',
            'localField': '_id',
            'foreignField': 'system',
            'as': 'tasks'
          }
        }, {
          '$unwind': {
            'path': '$tasks',
            'includeArrayIndex': 'index',
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$match': {
            'tasks.state': 'Done'
          }
        }, {
          '$match': {
            'tasks.createdAt': {
              '$gte': new Date(dateRange)
            }
          }
        }, {
          '$lookup': {
            'from': 'results',
            'localField': 'tasks._id',
            'foreignField': 'task',
            'as': 'results'
          }
        }, {
          '$sort': {
            'results.createdAt': -1
          }
        }, {
          '$set': {
            'res': {
              '$arrayElemAt': ['$results', 0]
            }
          }
        }, {
          '$group': {
            '_id': {
              'task_title': '$tasks.title',
              'systemId': '$_id'
            },
            'taskGlobalStatus': {
              '$first': '$res.gStatus'
            },
            'name': {
              '$first': '$name'
            },
            'grouped tasks': {
              '$sum': {
                '$cond': [
                  {
                    '$eq': ['$tasks.state', 'Done']
                  }, 1, 0
                ]
              }
            }
          }
        }, {
          '$group': {
            '_id': '$_id.systemId',
            'systemName': {
              '$first': '$name'
            },
            'Warning': {
              '$sum': {
                '$cond': [
                  {
                    '$eq': ['$taskGlobalStatus', 'Warning']
                  }, 1, 0
                ]
              }
            },
            'Critical': {
              '$sum': {
                '$cond': [
                  {
                    '$eq': ['$taskGlobalStatus', 'Critical']
                  }, 1, 0
                ]
              }
            },
            'Good': {
              '$sum': {
                '$cond': [
                  {
                    '$eq': ['$taskGlobalStatus', 'Good']
                  }, 1, 0
                ]
              }
            }
          }
        }
      ])

        if (systemsInfo.length === 0) {
            return {
                error: { message: 'No systems info was found' },
                statusCode: 204,
                status: 'success'
              };
        }
        return { data: systemsInfo, status: 'success' };
    } catch (error) {
        return { error, status: 'error' };
    }
}