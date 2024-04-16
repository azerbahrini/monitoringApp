const shiftSyncLog= require('../../models/shiftSyncLog');

module.exports = async function (obj) {
    try {
      const log = await shiftSyncLog.create(obj);
      return {data: log, status: 'success'};
    } catch (err) {
        return { err, status: 'error' };
    }

  }

