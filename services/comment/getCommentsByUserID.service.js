const Comment = require('../../models/Comment');

module.exports = async (userID) => {
  try {
    const comments = await Comment.find({ user: userID, isActive: true });
    if (comments.length === 0) {
      return {
        status: 'success',
        err: { message: 'No Comments found for this User ID !' },
        statusCode: 204
      };
    } else {
      return {
        status: 'success',
        data: comments,
        statusCode: 200
      };
    }
  } catch (err) {
    return { err, status: 'error', statusCode: 400 };
  }
};
