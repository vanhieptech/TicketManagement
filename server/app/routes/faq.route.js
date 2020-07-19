const express = require('express');
const router = express.Router();
const controller = require('../controller/faq.controller')


//GET /api/faq
router.get('/',controller.getFAQs);

//GET /api/faq/:id
router.get('/:id',controller.getFAQ);

//POST /api/faq
router.post('/', controller.postFAQ);

//PUT /api/faq
router.put('/:id', controller.putFAQ);

//DELETE /api/faq
router.delete('/:id', controller.deleteFAQ);

module.exports = router;