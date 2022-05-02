const { Router } = require('express');
const employeeCtl = require('../controllers/employees.controller.js')
const router = Router();

router.get('/',employeeCtl.getEmployees);

router.post('/',employeeCtl.createEmployee);

router.get('/:id',employeeCtl.getEmployee);

router.put('/:id',employeeCtl.editEmployee);

router.delete('/:id',employeeCtl.deleteEmployee);

module.exports = router;
