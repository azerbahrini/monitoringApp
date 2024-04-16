const Comment = require('../../models/Comment');

module.exports = async (comment) => {
    try {
      const document = await Comment.create({ ...comment });
      return { data: document, status: 'success', statusCode: 201};
    } catch (err) {
      return { err, status: 'error', statusCode: 400};
    }
  };
