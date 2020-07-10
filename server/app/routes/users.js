var express = require("express");
var router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* POST create a User */
router.post("/register", (req, res, next) => {
  console.log(req.body);
  User.findOne({email: req.body.email}).then((result) =>{
    if (result) {
      res.status(302).send({
        success: false,
        code: 302,
        msg: "This account is existed",
      });
    }
    else {
      User.create(req.body)
      .then(() => {
        res.status(200).send({
          success: true,
          code: 201,
          msg: "User created",
        });
      })
      .catch(next);
    }
  }).catch(next);  
});

module.exports = router;
