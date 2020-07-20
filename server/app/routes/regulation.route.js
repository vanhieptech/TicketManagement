const express = require('express');
const router = express.Router();
const controller = require('../controller/regulation.controller')


//GET /api/regulation
router.get('/',controller.getRegulations);

//GET /api/regulation/:id
router.get('/:id',controller.getRegulation);

//POST /api/regulation
router.post('/', controller.postRegulation);

//PUT /api/regulation
router.put('/:id', controller.putRegulation);

//DELETE /api/regulation
router.delete('/:id', controller.deleteRegulation);

module.exports = router;