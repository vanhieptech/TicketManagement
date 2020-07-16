const express = require('express');
const router = express.Router();
const controller = require('../controller/flight.controller')


//GET /flight
router.get('/',controller.getFlights);

//GET /flight/:id
router.get('/:id',controller.getFlight);

//POST /flight
router.post('/', controller.postFlight);

//PUT /flight
router.put('/:id', controller.putFlight);

//DELETE /flight
router.delete('/:id', controller.deleteFlight);



module.exports = router;