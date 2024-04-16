const News = require('../../models/NewsFeed');

module.exports = async (id, body) => {
    try {
      const Document = await News.findOneAndUpdate(
        {
          _id: id
        },
        body,
        { new: true }
      )
        .lean()
        .exec();
      if (!Document) {
        return {
          err: { message: 'post not found.' },
          status: 'error',
          statusCode: 204
        };
      }
      return { data: Document, status: 'success' };
    } catch (err) {
      return { err, status: 'error' };
    }
  };