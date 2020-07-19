const express = require('express');
const router = express.Router();
const controller = require('../controller/feedback.controller')


//GET /api/feedback
router.get('/',controller.getFeedbacks);

//GET /api/feedback/:id
router.get('/:id',controller.getFeedback);

//POST /api/feedback
router.post('/', controller.postFeedback);

//PUT /api/feedback
router.put('/:id', controller.putFeedback);

//DELETE /api/feedback
router.delete('/:id', controller.deleteFeedback);

module.exports = router;