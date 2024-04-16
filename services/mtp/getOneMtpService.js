const MTP = require('../../models/MTP');

module.exports = async (id) => {
    try {
      const doc = await MTP.findOne({ _id: id }).lean().exec();
      if (!doc) {
        return {
          err: { message: 'MTP not found' },
          status: 'no data',
          statusCode: 204
        };
      }
      return { data: doc, status: 'success' };
    } catch (err) {
      return { err, status: 'error' };
    }
  };