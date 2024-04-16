const express = require('express');
const router = express.Router();
const moduleController = require('../../controllers/module.controller');
const getAllValidator = require("../../middleware/validators/getAllValidators/getAllValidator"); 
const {addModuleValidator,getAllBasicModuleValidator, getAllModuleValidator,updateModuleValidator,getModuleByIdValidator,deleteModuleValidator}= require('../../middleware/validators/module');

router.get('/getAll',getAllValidator, moduleController.getAllModule);
router.get('/getAllBasic',getAllBasicModuleValidator, moduleController.getAllBasicModule);
router.post('/',addModuleValidator, moduleController.addModule);
router.get('/getOne/:id/',getModuleByIdValidator, moduleController.getModuleById);
router.patch('/:id',updateModuleValidator, moduleController.updateModule);
router.delete('/:id',deleteModuleValidator, moduleController.deleteModule);

module.exports = router;
