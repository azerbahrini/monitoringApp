
const monitoringActivityService = require('../monitoringActivity')
const getAllResultFormService = require('./getAllResultForm.service');

module.exports = async() => {
    try {
        const resultForm = await getAllResultFormService()
        const monitorindActivity = await monitoringActivityService.getAllMonitoringActivityService(false, null, null, {isActive: true}, null);
        const doc = monitorindActivity.data.docs.filter(({_id: id1}) => !resultForm.data.docs.some(({monitoringActivity: id2}) =>
        id2.toString()===id1.toString()))
        return { data: doc, status: 'success' };
    } catch (err) {
        return { err, status: 'error' };
      }
};