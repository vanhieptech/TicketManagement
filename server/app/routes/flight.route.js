const express = require('express');
const router = express.Router();
const controller = require('../controller/flight.controller')


//GET /api/flight
router.get('/',controller.getFlights);
router.get('/search',controller.searchFlight);
router.get('/sort',controller.sortFlight);
//GET /api/flight/:id
router.get('/:id',controller.getFlight);

//POST /api/flight
router.post('/', controller.postFlight);

//PUT /api/flight
router.put('/:id', controller.putFlight);

//DELETE /api/flight
router.delete('/:id', controller.deleteFlight);



module.exports = router;