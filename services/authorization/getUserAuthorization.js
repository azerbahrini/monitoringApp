const Shift = require('../../models/Shift');
const ObjectID = require('mongodb').ObjectId;
const moment = require('moment');

exports.getRolesPermission = async ( userId ) => {
  try {
    const date = new Date(moment.now())
    const aggregate = [
      {
        $match: {
          user: ObjectID(userId),
          $and: [{ startDate: { $lte: date }, endDate: { $gte: date } }]
        }
      },
      {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'populatedUser'
      }
    }, {
      $set:
      {
        'UserStatus': {
          '$arrayElemAt': ['$populatedUser.status', 0]
        }
      }
    },
    {
      $lookup: {
        from: 'roles',
        localField: 'role',
        foreignField: '_id',
        as: 'populatedRole'
      }
    },
    {
      $lookup: {
        from: 'modules',
        localField: 'populatedRole.listModule',
        foreignField: '_id',
        as: 'populatedModules'
      }
    },
    {
      $lookup: {
        from: 'permissions',
        localField: 'populatedModules.listPermission',
        foreignField: '_id',
        as: 'populatedPermissions'
      }
    },
    {
      $lookup: {
        from: 'permissions',
        localField: 'populatedPermissions.relatedPermissions',
        foreignField: '_id',
        as: 'relatedPermissions'
      }
    },
     {
      $match: {
        UserStatus: true,
        $or: [
          {
            type: 'app'
          },
          {
            'populatedRole.label': 'Team Leader'
          }
        ]
      }
    },
    {
      $project: {
        populatedModules: 1,
        populatedPermissions: 1,
        relatedPermissions: 1
      }
    }
  ];
    const permissions = await Shift.aggregate(aggregate);
    return { data: permissions, status: 'success' };
  } catch (err) {
    console.log(err);
    return { err, status: 'error' };
  }
}