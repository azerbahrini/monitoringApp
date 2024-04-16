const Result = require('../../models/Result');
const Mongoose = require('mongoose');
const moment = require('moment');

module.exports = async (mapsIds, dateTime) => {

  try {

    const mapsIdsArray = [];
    mapsIds.forEach(element => {
      mapsIdsArray.push(Mongoose.Types.ObjectId(element))
        });
    const docs = await Result.aggregate(
      [
        {
          '$lookup': {
            'from': 'tasks',
            'localField': 'task',
            'foreignField': '_id',
            'as': 'populatedTasks'
          }
        }, {
          '$set': {
            'tasks': {
              '$arrayElemAt': ['$populatedTasks', 0]
            }
          }
        }, {
          '$match': {
            'tasks.map': {
              '$in': mapsIdsArray
            },
            'createdAt': {'$lte': new Date(moment(dateTime).utc())},
            'tasks.state': 'Done'
          }
        }, {
          '$lookup': {
            'from': 'maps',
            'localField': 'tasks.map',
            'foreignField': '_id',
            'as': 'maps'
          }
        }, {
          '$lookup': {
            'from': 'systems',
            'localField': 'tasks.system',
            'foreignField': '_id',
            'as': 'populatedSystems'
          }
        }, {
          '$set': {
            'maps': {
              '$arrayElemAt': ['$maps', 0]
            },
            'systems': {
              '$arrayElemAt': ['$populatedSystems', 0]
            }
          }
        }, {
          '$set': {
            'systemsName': '$systems.name',
            'systemId': '$systems._id',
            'mapsId': '$maps._id',
            'taskName': '$tasks.title'
          }
        }, {
          '$sort': {
            'createdAt': -1
          }
        }, {
          '$group': {
            '_id': '$mapsId',
            'resultId': {
              '$first': '$_id'
            }
          }
        }, {
          '$lookup': {
            'from': 'maps',
            'localField': '_id',
            'foreignField': '_id',
            'as': 'maps'
          }
        }, {
          '$set': {
            'maps': {
              '$arrayElemAt': ['$maps', 0]
            }
          }
        }, {
          '$lookup': {
            'from': 'systems',
            'localField': 'maps.system',
            'foreignField': '_id',
            'as': 'systems'
          }
        }, {
          '$lookup': {
            'from': 'results',
            'localField': 'resultId',
            'foreignField': '_id',
            'as': 'resultPopulated'
          }
        },
        {
          '$lookup': {
            'from': 'monitoringacts',
            'localField': 'maps.monitoringAct',
            'foreignField': '_id',
            'as': 'populatedAct'
          }
        },

        {
          '$set': {
            'gStatus': {
              '$arrayElemAt': ['$resultPopulated.gStatus', 0]
            },
            'createdAt': {'$arrayElemAt': ['$resultPopulated.createdAt', 0]},
            'dataSet': {'$arrayElemAt': ['$resultPopulated.dataSet', 0]},
            'activity': {'$arrayElemAt': ['$populatedAct.activity', 0]},
            'files': {'$arrayElemAt': ['$resultPopulated.files', 0]}
          }
        }, {
          '$set': {
            'systemId': {
              '$arrayElemAt': ['$systems._id', 0]
            },
            'systemName': {
              '$arrayElemAt': ['$systems.name', 0]
            },
            'result': [
              {
                'mapId': '$_id',
                'resultId': '$resultId',
                'globalStatus': '$gStatus',
                'createdAt': '$createdAt',
                'dataSet': '$dataSet',
                'activity': '$activity',
                'files': '$files'
              }
            ]
          }
        }, {
          '$group': {
            '_id': '$systemId',
            'result': {
              '$push': {
                '$arrayElemAt': ['$result', 0]
              }
            }
          }
        }, {
          '$lookup': {
            'from': 'systems',
            'localField': '_id',
            'foreignField': '_id',
            'as': 'sysPopulated'
          }
        }, {
          '$set': {
            'systemId': {
              '$arrayElemAt': ['$sysPopulated._id', 0]
            },
            'systemName': {
              '$arrayElemAt': ['$sysPopulated.name', 0]
            }
          }
        }, {
          '$project': {
            '_id': 0,
            'sysPopulated': 0
          }
        }
      ]
    );
    return { data: docs, status: 'success' };
  } catch (err) {
    return { err, status: 'error' };
  }
};
