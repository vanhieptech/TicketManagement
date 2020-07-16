const express = require('express');
const router = express.Router();
const controller = require('../controller/airport.controller')


//GET /airport
router.get('/',controller.getAirports);

//GET /airport/:id
router.get('/:id',controller.getAirport);

//POST /airport
router.post('/', controller.postAirport);

//PUT /airport
router.put('/:id', controller.putAirport);

//DELETE /airport
router.delete('/:id', controller.deleteAirport);

module.exports = router;