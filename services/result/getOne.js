const Result = require('../../models/Result');

module.exports = async (resultID) => {
  try {
    const result = await Result.findOne({ _id: resultID }).lean().exec();
    if (!result) {
      return {
        err: { message: 'No Result Can be found with this ID' },
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
