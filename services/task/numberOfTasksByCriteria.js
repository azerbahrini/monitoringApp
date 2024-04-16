//Model Object
const Task = require('../../models/Task');
const moment = require('moment-timezone');
const toUtc = require('../../utils/toUTC');
module.exports = async (searchValue, startDate, endDate, timeZone) => {
  try {

     let pending=0
     let inProgress=0
     let done=0
     let canceled=0
     let toBeValidated=0
     let rejected=0
     let deleted=0
     let completed=0

    const convertedStartDate = new Date(
      toUtc(moment(startDate).tz(timeZone).format(), timeZone)
    );
    const convertedEndDate = new Date(
      toUtc(moment(endDate).tz(timeZone).format(), timeZone)
    );

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
          }
        ]
      });
    });

    const doc = await Task.aggregate([
      {
        $lookup: {
          from: 'results',
          localField: '_id',
          foreignField: 'task',
          as: 'populatedResult'
        }
      },
      {
        $set: {
          resultId: {
            $arrayElemAt: ['$populatedResult._id', 0]
          },
          resultCreatedAt: {
            $arrayElemAt: ['$populatedResult.createdAt', 0]
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

   doc.forEach((task) => {
      switch (task.state) {
        case 'In progress':
          return inProgress++;

        case 'Done':
          return done++;

        case 'Canceled':
          return canceled++;

        case 'To be validated':
          return toBeValidated++;

        case 'Rejected':
          return rejected++;

        case 'Deleted':
          return deleted++;

        case 'Completed':
          return completed++;

        default:
          return pending++;
      }
    });

    const result = {
      'Pending': pending,
      'In_Progress': inProgress,
      'Done': done,
      'Canceled': canceled,
      'To_Be_Validated': toBeValidated,
      'Rejected': rejected,
      'Deleted': deleted,
      'Completed': completed
    };

    if (doc.length === 0) {
      return {
        error: { message: 'No Tasks found' },
        status: 'no data',
        statusCode: 204
      };
    }
    return { data: result, status: 'success', statusCode: 200 };
  } catch (err) {
    return { err, status: 'error', statusCode: 400 };
  }
};
