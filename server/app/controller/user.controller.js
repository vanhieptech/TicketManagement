var express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const moment = require("moment");
module.exports = {
  signUp: async (req, res, next) => {
    const dob = moment(req.body.dob);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      dob: dob,
      gender: req.body.gender,
      password: hashedPassword,
    });
    User.findOne({ email: req.body.email })
      .then((result) => {
        if (result) {
          res.status(302).send({
            success: false,
            code: 302,
            msg: "This account is existed",
          });
        } else {
          User.create(user)
            .then(() => {
              res.status(201).send({
                success: true,
                code: 201,
                msg: "User created",
              });
            })
            .catch(next);
        }
      })
      .catch(next);
  },
  logIn: async (req, res, next) => {
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
  },
};
