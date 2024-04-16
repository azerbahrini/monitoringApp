const express = require('express');
const router = express.Router();
const resultController = require('../../controllers/result.controller');
const validator = require('../../middleware/validators/result');
const uploadFile = require('../../middleware/uploadFile');

router
  .route('/')
  .post(uploadFile.array('files'), resultController.addResult);

  router
  .route('/resultByMapsIds')
  .post(
    validator.getResultByMapsIds, resultController.getResultsByMapsId
  );

router
  .route('/byResultId/:id')
  .get(validator.getOneValidation, resultController.getResultsById);
router
  .route('/:id')
  .get(validator.getOneValidation, resultController.getOneResult)
  .patch(uploadFile.array('files'), resultController.updateResult);

router
  .route('/previousResult/:id')
  .get(
    validator.getPreviousResult,
    resultController.getPreviousResultByTaskId
  );

module.exports = router;
