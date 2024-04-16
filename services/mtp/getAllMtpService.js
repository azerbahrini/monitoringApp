const MTP = require('../../models/MTP');

module.exports = async (page, size, active) => {
  try {
    options = {
      offset: page * size,
      limit: size
    }
    findFilter = {
      ...active
    };
    const docs = await MTP.paginate(findFilter, options)
    if (docs.docs.length === 0) {
      return {
        err: { message: 'MTP not found' },
        status: 'no data',
        statusCode: 204
      };
    }
    return { data: docs, status: 'success' };
  } catch (err) {
    return { err, status: 'error' };
  }
};
