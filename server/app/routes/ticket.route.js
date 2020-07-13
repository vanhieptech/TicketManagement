const express = require('express');
const router = express.Router();
// const Ticket = require('../models/ticket');

//GET /ticket
router.get('/', (req,res) =>{
    res.send({type:'GET'});
});

//POST /api/ticket
router.post('/', (req,res) =>{
    res.send({type:'GET'});
});

//PUT /api/ticket
router.put('/', (req,res) =>{
    res.send({type:'GET'});
});

//DELETE /api/ticket
router.delete('/', (req,res) =>{
    res.send({type:'GET'});
});



module.exports = router;