const express = require('express');
const router = express.Router();
const controller = require('../controller/user.controller')
const checkauth = require('../middlewares/check-auth.mdw')


//GET /api/user
router.get('/', checkauth.checkAdmin, controller.getUsers);

//GET /api/user/:id
router.get('/:id', checkauth.checkAdmin, controller.getUser);

module.exports = router;