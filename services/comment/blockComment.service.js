const Comment = require('../../models/Comment');
const notificationService = require('../../kafka/notificationServiceKafka');

module.exports = async (id) => {
  try {
    const CommentDocument = await Comment.findOneAndUpdate(
      { _id: id },
      { isBlocked: true },
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
    await notificationService.commentNotif({
      key: 'Comment',
      data: {
        comment: CommentDocument,
        message: 'Comment blocked'
      }
    });
    return { data: CommentDocument, status: 'success', statusCode: 200 };
  } catch (err) {
    return { err, status: 'error', statusCode: 400 };
  }
};
