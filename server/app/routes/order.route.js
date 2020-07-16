const express = require('express');
const router = express.Router();
const orderController = require('../controller/order.controller')
//POST /api/order
router.post('/', orderController.sendOrder);

//PUT /api/order
router.put('/', (req,res) =>{
    res.send({type:'PUT'});
});

//DELETE /api/order
router.delete('/', (req,res) =>{
    res.send({type:'DELETE'});
});



module.exports = router;