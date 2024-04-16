const Shift = require('../../models/Shift');
const moment = require('moment');

module.exports = async (userId, teamLeaderRoleID=null) => {
  try {
    const dateTime = moment().utc().format();
    const findQuery = {
      user: userId,
      type: 'shift',
      $and: [
        {
          startDate: { $lte: moment().add(2, 'hours').utc().format() }
        },
        {
          endDate: { $gte: dateTime }
        }
      ]
    };
    if (teamLeaderRoleID !== null) {
      findQuery.role = teamLeaderRoleID;
    }
    const doc = await Shift.findOne(findQuery);

    if (teamLeaderRoleID && !doc) {
      return {
        err: { message: 'You are not authorized' },
        status: 'error',
        statusCode: 203
      };
    }

    if (!doc) {
      return { data: doc, status: 'success', statusCode: 204 };
    }
    return { data: doc, status: 'success', statusCode: 200 };
  } catch (err) {
    return { err, status: 'error' };
  }
};
