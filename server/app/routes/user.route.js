const express = require('express');
const router = express.Router();
const controller = require('../controller/user.controller')
const checkauth = require('../middlewares/check-auth.mdw')


//GET /api/user
router.get('/', checkauth.checkAdmin, controller.getUsers);

//GET /api/user
router.post('/login', controller.login);

//GET /api/user/:id
router.get('/:id', checkauth.checkAdmin, controller.getUser);

//GET /api/user/:id
router.put('/:id', checkauth.checkCustomer, controller.putUser);

router.get('/:id/checkoldpassword', controller.checkOldPassword);

//GET /api/user
router.post('/', checkauth.checkAdmin, controller.postUser);





module.exports = router;