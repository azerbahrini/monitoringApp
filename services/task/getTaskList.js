//Model Object
const Task = require('../../models/Task');
const moment = require('moment-timezone');
const toUtc = require('../../utils/toUTC')
module.exports = async (
  searchValue,
  type,
  state,
  startDate,
  endDate,
  timeZone,
  page,
  size,
  paginate
) => {
  try {
const convertedStartDate = new Date(toUtc(moment(startDate).tz(timeZone).format(), timeZone));
const convertedEndDate = new Date(toUtc(moment(endDate).tz(timeZone).format(), timeZone));
    let paginateParam = true;
    if (paginate === 'false'){
      paginateParam = false
    }
    const options = {
        page: page,
        limit: size,
        pagination: paginateParam
      };
    const myArray = searchValue?.split(' ');
    const searchArray = [
      {
        $or: [
          {
            title: {
              $regex: '',
              $options: 'i'
            }
          },
          {
            customerName: {
              $regex: '',
              $options: 'i'
            }
          },
          {
            assigneeName: {
              $regex: '',
              $options: 'i'
            }
          },
          {
            systemName: {
              $regex: '',
              $options: 'i'
            }
          },
          {
            globalStatus: {
              $regex: '',
              $options: 'i'
            }
          }
        ]
      }
    ];

    myArray?.map((searchFragment) => {
      searchArray.push({
        $or: [
          {
            title: {
              $regex: searchFragment,
              $options: 'i'
            }
          },
          {
            customerName: {
              $regex: searchFragment,
              $options: 'i'
            }
          },
          {
            assigneeName: {
              $regex: searchFragment,
              $options: 'i'
            }
          },
          {
            systemName: {
              $regex: searchFragment,
              $options: 'i'
            }
          },
          {
            globalStatus: {
              $regex: searchFragment,
              $options: 'i'
            }
          }
        ]
      });
    });

    const doc = Task.aggregate([
        {
            '$lookup': {
              'from': 'results',
              'localField': '_id',
              'foreignField': 'task',
              'as': 'populatedResult'
            }
          }, {
            '$set': {
              'resultId': {
                '$arrayElemAt': ['$populatedResult._id', 0]
              },
              'resultCreatedAt': {
                '$arrayElemAt': ['$populatedResult.createdAt', 0]
              }
            }
          },
      {
        $lookup: {
          from: 'users',
          localField: 'assignee',
          foreignField: '_id',
          as: 'populatedUser'
        }
      },
      {
        $set: {
          assigneeName: {
            $concat: [
              {
                $arrayElemAt: ['$populatedUser.firstName', 0]
              },
              ' ',
              {
                $arrayElemAt: ['$populatedUser.lastName', 0]
              }
            ]
          }
        }
      },
      {
        $lookup: {
          from: 'systems',
          localField: 'system',
          foreignField: '_id',
          as: 'populatedSystem'
        }
      },
      {
        $set: {
          systemName: {
            $arrayElemAt: ['$populatedSystem.name', 0]
          }
        }
      },
      {
        $lookup: {
          from: 'customers',
          localField: 'populatedSystem.customer',
          foreignField: '_id',
          as: 'populatedCustomer'
        }
      },
      {
        $set: {
          customerName: {
            $arrayElemAt: ['$populatedCustomer.label', 0]
          }
        }
      },
      {
        $match: {
          $and: searchArray
        }
      },
      {
        $match: {

              state: {
                $in: state
              }
            }
      },
      {
        $match: {
          type: {
            $in: type
          }
        }
      },
      {
        $match: {
          $and: [
            {
              estimatedStart: {
                $lte: convertedEndDate
              }
            },
            {
              estimatedStart: {
                $gte: convertedStartDate
              }
            }
          ]
        }
      },
      {
        $project: {
          populatedUser: 0,
          populatedSystem: 0,
          populatedCustomer: 0,
          populatedResult: 0
        }
      }
    ]);

    const paginatedTasks = await Task.aggregatePaginate(doc, options);
    if (paginatedTasks?.docs?.length > 0) {
      paginatedTasks.docs?.map((task) => {
           task.estimatedStart = moment(task?.estimatedStart).tz(timeZone).format();
           task.resultCreatedAt = moment(task?.resultCreatedAt).tz(timeZone).format();

  });
}
    if (doc.length === 0) {
      return {
        error: {message: 'No Tasks found' },
        status: 'no data',
        statusCode: 204
      };
    }
    return { data: paginatedTasks, status: 'success', statusCode: 200 };
  } catch (err) {
    return { err, status: 'error', statusCode: 400 };
  }
};
