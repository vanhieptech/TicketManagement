const express = require('express');
const router = express.Router();
const controller = require('../controller/airline.controller')

//GET /api/airline
router.get('/',controller.getAirlines);

//GET /api/airline/:id
router.get('/:id',controller.getAirline);

//POST /api/airline
router.post('/', controller.postAirline);

//PUT /api/airline
router.put('/:id', controller.putAirline);

//DELETE /api/airline
router.delete('/:id', controller.deleteAirline);

module.exports = router;