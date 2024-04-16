const Comment = require('../../models/Comment');

module.exports = async (id) => {
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return {
        status: 'success',
        err: { message: 'No Comment found' },
        statusCode: 204
      };
    } else {
      return {
        status: 'success',
        data: comment,
        statusCode: 200
      };
    }
  } catch (err) {
    return { err, status: 'error', statusCode: 400 };
  }
};
