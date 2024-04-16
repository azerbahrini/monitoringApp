
const System = require('../../models/System');
const ObjectId = require('mongodb').ObjectId;
const moment = require('moment-timezone');
const toUtc = require('../../utils/toUTC')

module.exports = async (startDate, endDate, customerID) => {
  try {
    const convertedStartDate = new Date(toUtc(moment(startDate).tz(timeZone).format(), timeZone));
    const convertedEndDate = new Date(toUtc(moment(endDate).tz(timeZone).format(), timeZone));

      const stats = await System.aggregate([
        {
          '$match': {
            'customer': new ObjectId(customerID),
            'createdAt': {
                $gte: convertedStartDate,
                $lte: convertedEndDate
              }
          }
        }, {
          '$count': 'system'
        }, {
          '$set': {
            'Number Of Systems': '$system'
          }
        }, {
          '$project': {
            'system': 0
          }
        }
      ])

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

