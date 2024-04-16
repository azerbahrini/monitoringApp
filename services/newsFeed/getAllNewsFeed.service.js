const News = require('../../models/NewsFeed');

module.exports = async (populateWith, page, size, paginate) => {
  try {
    const options = {
      offset: page * size,
      limit: size,
      pagination: paginate,
      populate: populateWith
    }
    const docs = await News.paginate(
        {
          isActive: true
        },
        options
      );
    return { data: docs, status: 'success' };
  } catch (err) {
    return { err, status: 'error' };
  }
};
