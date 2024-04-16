const News = require('../../models/NewsFeed');

module.exports = async (doc) => {
  try {
    const post = await News.create({ ...doc });

    if (!post) {
      return {
        err: { message: 'post creation problem' },
        status: 'error'
      };
    }

    return { data: post, status: 'success' };
  } catch (err) {
    return { err, status: 'error' };
  }
};
