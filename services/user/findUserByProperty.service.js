const User = require('../../models/User');
const logger = require('../../config/logger');

// check how can you populateWith
module.exports = async (object, populateWith = '', selectProperty = '') => {
  try {
    let user;
    if (selectProperty !== '') {
      user = await User.findOne(object)
        .populate(populateWith)
        .select(selectProperty)
        .lean()
        .exec();
    } else {
      user = await User.findOne(object).populate(populateWith).lean().exec();
    }

    if (!user) {
      return {
        err: { message: 'user not found' },
        status: 'error',
        statusCode: 404
      };
    }
    return {
      data: user,
      status: 'success'
    };
  } catch (err) {
    logger.error(
      err.message
    );
    return {
      err,
      status: 'error'
    };
  }
};
