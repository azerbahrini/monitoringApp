const ResultForm = require('../../models/ResultForm');
module.exports = async (id) => {
    try {
      const doc = await ResultForm.findOne({ _id: id }).populate({path: 'monitoringActivity', select: ['_id', 'activity']}).lean().exec();
      if (!doc) {
        return {
          err: { message: 'result form not found' },
          status: 'error',
          statusCode: 404
        };
      }
      return { data: doc, status: 'success' };
    } catch (err) {
      return { err, status: 'error' };
    }
  };