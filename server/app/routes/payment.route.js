const express = require('express');
const router = express.Router();
const controller = require('../controller/payment.controller')


//GET /api/payment
router.get('/',controller.getPayments);

//GET /api/payment/:id
router.get('/:id',controller.getPayment);

//POST /api/payment
router.post('/', controller.postPayment);

//PUT /api/payment
router.put('/:id', controller.putPayment);

//DELETE /api/payment
router.delete('/:id', controller.deletePayment);

module.exports = router;