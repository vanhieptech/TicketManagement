const express = require('express');
const router = express.Router();
const controller = require('../controller/standardfare.controller')


//GET /api/standardfare
router.get('/', controller.getStandardFares);

//GET /api/standardfare/:id
router.get('/:id', controller.getStandardFare);

//POST /api/standardfare
router.post('/', controller.postStandardFare);

//PUT /api/standardfare
router.put('/:id', controller.putStandardFare);

module.exports = router;