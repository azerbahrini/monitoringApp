const express = require('express');
const router = express.Router();
const slaController = require('../../controllers/sla.controller');
const {addSlaValidator,updateSlaValidator,getSlaByIdValidator,getSlaBySlaContractValidator,deleteSlaValidator}= require('../../middleware/validators/sla');

router.get('/getbySlaContract/:id',getSlaBySlaContractValidator, slaController.getSlaBySlaContract);
router.post('/',addSlaValidator, slaController.addSla);
router.get('/getone/:id/',getSlaByIdValidator, slaController.getSlaById);
router.patch('/update/:id',updateSlaValidator, slaController.updateSla);
router.patch('/delete/:id',deleteSlaValidator, slaController.deleteSla);

module.exports = router;
