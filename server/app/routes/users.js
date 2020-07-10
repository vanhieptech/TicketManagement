var express = require("express");
var router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* POST create new user */
router.post("/register", async (req, res, next) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        res.status(302).send({
          success: false,
          code: 302,
          msg: "This account is existed",
        });
      } else {
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
    })
    .catch(next);
});

/* POST login with account */
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).send({
        success: false,
        code: 401,
        msg: "Account not found",
      });
    } else {
      let isMatched = bcrypt.compareSync(req.body.password, user.password);
      if (isMatched) {
        res.status(200).send({
          success: true,
          code: 200,
          msg: "Login successfully",
          data: user
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(
      {
        success: false,
        code: 500,
        msg: "Server is in maintainance",
      }
    )
  }
});

module.exports = router;
