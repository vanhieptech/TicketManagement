var express = require("express");
var router = express.Router();
const userController = require('../controller/user.controller');

//POST
router.post('/',userController.signUp)

module.exports = router;
