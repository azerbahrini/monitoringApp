const express = require('express');
const router = express.Router();
const shiftController = require('../../controllers/shift.controller');
const validator = require('../../middleware/validators/shift');

router
  .route('/assignTeamLeader')
  .post(validator.assignTeamLeader, shiftController.assignTeamLeader);

  router
  .route('/getAllMembersByShifts')
  .get(validator.getAllMembersByShifts, shiftController.getAllMembersByShifts)

router
  .route('/')
  .get(validator.getAllValidation, shiftController.getAllShifts)

router
  .route('/members')
  .get(validator.getAllMembersValidation, shiftController.getAllMembers);

  router
  .route('/currentMembers')
  .get(validator.getCurrentMembers, shiftController.getCurrentMembers);

router.route('/sync').patch(shiftController.syncShift);

router
  .route('/getshiftByUser/:id')
  .get(validator.getShiftByUserIDValidators, shiftController.getShiftByUserID)

module.exports = router;
