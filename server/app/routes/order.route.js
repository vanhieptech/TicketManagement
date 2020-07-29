const express = require('express');
const router = express.Router();
const controller = require('../controller/order.controller')
const checkauth = require('../middlewares/check-auth.mdw')


//GET /api/order
router.get('/', checkauth.checkCustomer, controller.getOrders);

//GET /api/order/:id
router.get('/:id', controller.getOrder);

//POST /api/order
router.post('/', controller.postOrder);

//PUT /api/order
router.put('/:id', controller.putOrder);

//DELETE /api/order
router.delete('/:id', controller.deleteOrder);

module.exports = router;