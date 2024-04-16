const express = require('express');
const router = express.Router();
const mtpController = require('../../controllers/mtp.controller');
const validator = require('../../middleware/validators/mtp');

router.post('/', validator.addValiddator, mtpController.addMtp);
router.get(
  '/:id',
  validator.getOneValiddator,
  mtpController.getMTPById
);

router.patch(
  '/update/:id',
  validator.updateValiddator,
  mtpController.updateMTP
);
router.patch(
  '/delete/:id',
  validator.deleteValiddator,
  mtpController.deleteMtp
);
router.get(
  '/',
  validator.getAllValidator,
  mtpController.getAllMTP
);

module.exports = router;
