const express = require('express');
const router = express.Router();
const controller = require('../controller/regulation.controller')
const checkauth = require('../middlewares/check-auth.mdw')


//GET /api/regulation
router.get('/', checkauth.checkAdmin, controller.getRegulations);

//GET /api/regulation/:id
router.get('/:id', checkauth.checkAdmin, controller.getRegulation);

//POST /api/regulation
router.post('/', checkauth.checkAdmin, controller.postRegulation);

//PUT /api/regulation
router.put('/:id', checkauth.checkAdmin, controller.putRegulation);

//DELETE /api/regulation
router.delete('/:id', checkauth.checkAdmin, controller.deleteRegulation);

module.exports = router;