const News = require('../../models/NewsFeed');
module.exports = async (id) => {
    try {
      const doc = await News.find({ user: id })
      .populate('user')
        .lean()
        .exec();
      if (typeof doc !== 'undefined' && doc.length === 0) {
        return {
          err: { message: 'post not found' },
          status: 'error',
          statusCode: 204
        };
      }
      return { data: doc, status: 'success' };
    } catch (err) {
      return { err, status: 'error' };
    }
  };