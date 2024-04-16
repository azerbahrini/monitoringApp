const Customer = require('../../models/Customer');
const moment = require('moment')
module.exports = async () => {
  try {
    const dateRange = moment().subtract(1, 'days').format('YYYY-MM-DD')
    const customersInfo = await Customer.aggregate([
      {
        $match: {
          isActive: true
        }
      },
      {
        $lookup: {
          from: 'systems',
          localField: '_id',
          foreignField: 'customer',
          as: 'systems'
        }
      },
      {
        $unwind: {
          path: '$systems',
          includeArrayIndex: 'index',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          'systems.isActive': true
        }
      },
      {
        $project: {
          _id: true,
          index: true,
          label: true,
          'systems._id': true,
          'systems.name': true,
          'systems.createdAt': true
        }
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'systems._id',
          foreignField: 'system',
          as: 'systems.tasks'
        }
      },
      {
        $unwind: {
          path: '$systems.tasks',
          includeArrayIndex: 'systems.index',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          'systems.tasks.state': 'Done'
        }
      },
      {
        $match: {
          'systems.tasks.createdAt': {
            '$gte': new Date(dateRange)
          }
        }
      },
      {
        $lookup: {
          from: 'results',
          localField: 'systems.tasks._id',
          foreignField: 'task',
          as: 'results'
        }
      },
      {
        $sort: {
          'results.createdAt': -1
        }
      },
      {
        $set: {
          res: {
            $arrayElemAt: ['$results', 0]
          }
        }
      },
      {
        $group: {
          _id: {
            task_title: '$systems.tasks.title',
            systemId: '$systems._id'
          },
          taskGlobalStatus: {
            $first: '$res.gStatus'
          },
          name: {
            $first: '$systems.name'
          },
          customerName: {
            $first: '$label'
          },
          customer: {
            $first: '$_id'
          },
          'grouped tasks': {
            $sum: {
              $cond: [
                {
                  $eq: ['$systems.tasks.state', 'Done']
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $group: {
          _id: '$_id.systemId',
          customerID: {
            $first: '$customer'
          },
          customerName: {
            $first: '$customerName'
          },
          systemName: {
            $first: '$name'
          },
          Warning: {
            $sum: {
              $cond: [
                {
                  $eq: ['$taskGlobalStatus', 'Warning']
                },
                1,
                0
              ]
            }
          },
          Critical: {
            $sum: {
              $cond: [
                {
                  $eq: ['$taskGlobalStatus', 'Critical']
                },
                1,
                0
              ]
            }
          },
          Good: {
            $sum: {
              $cond: [
                {
                  $eq: ['$taskGlobalStatus', 'Good']
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $group: {
          _id: {
            customerID: '$customerID',
            customerName: '$customerName'
          },
          Warning: {
            $sum: {
              $cond: [
                {
                  $gt: ['$Warning', 0]
                },
                1,
                0
              ]
            }
          },
          Critical: {
            $sum: {
              $cond: [
                {
                  $gt: ['$Critical', 0]
                },
                1,
                0
              ]
            }
          },
          Good: {
            $sum: {
              $cond: [
                {
                  $gt: ['$Good', 0]
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $project: {
          customerID: '$_id.customerID',
          customerName: '$_id.customerName',
          _id: 0,
          Warning: 1,
          Critical: 1,
          Good: 1
        }
      }
    ]);
    return { data: customersInfo, status: 'success' };
  } catch (err) {
    return { err: err, status: 'error' };
  }
};
