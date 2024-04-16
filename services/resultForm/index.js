const getResultFormByTaskId = require('./getResultFormByTaskId');
const addResultFormService = require('./addResultForm.service');
const getResultFormByIdService = require('./getResultFormById.service');
const getAllResultFormService = require('./getAllResultForm.service');
const deleteResultFormService = require('./deleteResultForm.service');
const updateResultFormService = require('./updateResultForm.service');
const getMonitoringActivitiesWithoutResultFormService = require('./getMonitoringActivitiesWithoutResultForm.service')
module.exports = {
    getResultFormByTaskId,
    addResultFormService,
    getResultFormByIdService,
    getAllResultFormService,
    deleteResultFormService,
    updateResultFormService,
    getMonitoringActivitiesWithoutResultFormService

}