const express = require('express');
const router = express.Router();
const controller = require('../controller/seat.controller')


//GET /api/seat
router.get('/',controller.getSeats);

//GET /api/seat/:id
router.get('/:id',controller.getSeat);

//POST /api/seat
router.post('/', controller.postSeat);

//PUT /api/seat
router.put('/:id', controller.putSeat);

//DELETE /api/seat
router.delete('/:id', controller.deleteSeat);

module.exports = router;