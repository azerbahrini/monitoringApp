const Result = require('../../models/Result');
const ObjectID = require('mongodb').ObjectId;

module.exports = async (task) => {
  try {
    const result = await Result.findOne({ task: ObjectID(task)}).sort('-createdAt').lean().exec();
    if (!result) {
      return {
        err: { message: 'No Result Can be found with this Task ID' },
        status: 'error',
        statusCode: 404
      };
    }
    return {
      data: result,
      status: 'success',
      statusCode: 200
    };
  } catch (err) {
    return { err, status: 'error', statusCode: 400 };
  }
};
