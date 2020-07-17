const express = require('express');
const router = express.Router();
const controller = require('../controller/aircraft.controller')


//GET /api/aircraft
router.get('/',controller.getAircrafts);

//GET /api/aircraft/:id
router.get('/:id',controller.getAircraft);

//POST /api/aircraft
router.post('/', controller.postAircraft);

//PUT /api/aircraft
router.put('/:id', controller.putAircraft);

//DELETE /api/aircraft
router.delete('/:id', controller.deleteAircraft);

module.exports = router;