const MTP = require('../../models/MTP');

module.exports = async (doc) => {
    try {
      const document = await MTP.create({ ...doc });
      return { data: document, status: 'success', statusCode: 201};
    } catch (err) {
      return { err, status: 'error', statusCode: 400};
    }
  };