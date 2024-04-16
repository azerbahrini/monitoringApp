const Comment = require('../../models/Comment');

module.exports = async (id, body) => {
  try {
    const CommentDocument = await Comment.findOneAndUpdate(
      {
        _id: id
      },
      body,
      { new: true }
    )
      .lean()
      .exec();

    if (!CommentDocument) {
      return {
        err: { message: 'Comment not found.' },
        status: 'error',
        statusCode: 404
      };
    }
    return { data: CommentDocument, status: 'success', statusCode: 200};
  } catch (err) {
    return { err, status: 'error', statusCode: 400 };
  }
};
