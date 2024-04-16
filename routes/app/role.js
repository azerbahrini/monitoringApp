const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/role.controller');
const {addRoleValidator,getAllRoleValidator,updateRoleValidator,getRoleByIdValidator,deleteRoleValidator}= require('../../middleware/validators/role');

router.get("/getRoleByUser" , roleController.getRolesByuser)
router.get('/',getAllRoleValidator, roleController.getAllRole);
router.post('/',addRoleValidator, roleController.addRole);
router.get('/:id/',getRoleByIdValidator, roleController.getRoleById);
router.patch('/update/:id',updateRoleValidator, roleController.updateRole);
router.patch('/delete/:id',deleteRoleValidator, roleController.deleteRole);

module.exports = router;
