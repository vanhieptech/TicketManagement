const express = require('express');
const router = express.Router();

//POST /api/faq/send
router.post('/',(req,res) =>{
    res.send({type:'POST'});
});


module.exports = router;