const News = require('../../models/NewsFeed');
module.exports = async (id) => {
    try {
      const doc = await News.findById(id)
      if (!doc) {
        return {
          err: { message: 'post not found' },
          status: 'error',
          statusCode: 204
        };
      }
      return { data: doc, status: 'success', statusCode: 200};
    } catch (err) {
      return { err, status: 'error', statusCode: 400 };
    }
  };