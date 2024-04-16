//Model Object
const Task = require('../../models/Task');
const toUtc = require('../../utils/toUTC');
const moment = require('moment');

module.exports = async (doc, timeZone) => {
  try {
    const estimatedStartUtc = toUtc(doc.estimatedStart, timeZone);
        if (moment().utc().isAfter(moment(estimatedStartUtc).utc().add(2, 'h').format())){
          doc.state='Canceled';
        } else if (moment().utc().isAfter(moment(estimatedStartUtc).utc().format()) && doc.state !== 'To be validated'){
          doc.state='In progress';
      }
    doc.estimatedStart = estimatedStartUtc;
    const document = await Task.create({ ...doc });
    return { data: document, status: 'success' };
  } catch (err) {
    return { err, status: 'error' };
  }
};
