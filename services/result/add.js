const Result = require('../../models/Result');

module.exports = async (doc) => {
    try {
      const document = await Result.create(doc);
      return { data: document, status: 'success' };
    } catch (err) {
      return { err, status: 'error' };
    }
  };