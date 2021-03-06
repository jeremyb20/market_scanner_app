const { Router } = require('express');
const userCtl = require('../controllers/users.controller.js')
const router = Router();
const verification = require('./../config')

router.get('/getUsers', verification, userCtl.getUsers);

router.post('/register',userCtl.registerUser);

router.post('/login',userCtl.loginUser);

router.get('/:id',userCtl.getUserById);

router.put('/edit/:id',userCtl.editUser);

router.post('/setThemeUser',userCtl.editTheme);

router.delete('/delete/:id',userCtl.deleteUser);

module.exports = router;
