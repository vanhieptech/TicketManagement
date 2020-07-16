var express = require("express");
var router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const userController = require('../controller/user.controller');
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* POST create new user */
router.post("/signup", userController.signUp);

/* POST login with account */
router.post("/login", userController.logIn);

module.exports = router;
