const express = require('express');
const router = express.Router();
const controller = require('../controller/admin.controller')


//GET /api/admin
router.get('/',controller.getAdmins);

//GET /api/admin/:id
router.get('/:id',controller.getAdmin);

//POST /api/admin
router.post('/', controller.postAdmin);

//PUT /api/admin
router.put('/:id', controller.putAdmin);

//DELETE /api/admin
router.delete('/:id', controller.deleteAdmin);

module.exports = router;