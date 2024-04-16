const Comment = require('../../models/Comment');

module.exports = async (feedID) => {
  try {
    const comments = await Comment.find({ feed: feedID, isActive: true }).populate('user', ['_id', 'firstName', 'lastName', 'avatar']);
    if (comments.length === 0) {
      return {
        status: 'success',
        err: { message: 'No Comments found for this newsfeed ID !' },
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
