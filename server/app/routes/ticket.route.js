const express = require('express');
const router = express.Router();
const controller = require('../controller/ticket.controller')


//GET /api/ticket
router.get('/',controller.getTickets);

//GET /api/ticket/:id
router.get('/:id',controller.getTicket);

//POST /api/ticket
router.post('/', controller.postTicket);

//PUT /api/ticket
router.put('/:id', controller.putTicket);

//DELETE /api/ticket
router.delete('/:id', controller.deleteTicket);

module.exports = router;