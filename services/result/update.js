const Result = require('../../models/Result');

module.exports = async (id, doc) => {
  try {
    if (!id) {
      return {
        err: { message: 'missing ID' },
        statusCode: 404,
        status: 'error'
      };
    }
    const resultDoc = await Result.findOneAndUpdate({ _id: id }, doc,
      { new: true });
    if (!resultDoc) {
      return {
        status: 'error',
        statusCode: 404,
        err: { message: 'Result not found' }
      };
    }
    return { data: resultDoc, status: 'success' };
  } catch (err) {
    return { err, status: 'error' };
  }
};