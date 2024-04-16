const express = require('express');
const router = express.Router();
const resultFormController = require('../../controllers/resultForm.controller')
const validator = require('../../middleware/validators/resultForm');
const getAllValidator = require('../../middleware/validators/getAllValidators/getAllValidator')

router.get(
    '/getFormSchemaByTaskId/:taskId',
    resultFormController.getFormSchemaByTaskId
  );
  router
  .route('/addFormSchema')
    .post(validator.addResultForm, resultFormController.addResultForm);
  router.route('/getAllResultForm').get(
    validator.getAllResultForm,
    resultFormController.getAllResultForm
  );
  router.route('/getResultFormById/:id').get(
    validator.getResultFormById,
    resultFormController.getResultFormById
  );
  router.route('/updateResultForm/:id').patch(
    validator.updateResultForm,
    resultFormController.updateResultForm
  )
  router.route('/deleteResultForm/:id').patch(
    validator.deleteResultForm,
    resultFormController.deleteResultForm
  );
  router.route('/getMonitoringActivitiesWithoutResultForm').get(
    getAllValidator,
    resultFormController.getMonitoringActivitiesWithoutResultForm
  );

module.exports = router;