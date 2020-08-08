var express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');

module.exports = {
  signUp: (req, res) => {
    //Tìm user với email
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        //Nếu tồn tại user với email
        if (user.length >= 1) {
          res.status(409).json({
            message: 'Mail existed'
          });
        } else { // Không tồn tại user với email
          //Hash password
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                dob: moment.utc(req.body.dob, 'DD-MM-YYYY HH:mm:ss'),
                gender: req.body.gender,
                permission: 'ROLE_USER',
                createdDate: moment.utc(moment().format(), 'DD-MM-YYYY HH:mm:ss'),
                updatedDate: moment.utc(moment().format(), 'DD-MM-YYYY HH:mm:ss')
              });
              //Lưu user
              user.save().then(result => {
                res.status(201).json({
                  message: 'User created',
                })
              }).catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                })
              });
            }
          })
        }
      });
  },
  login: (req, res) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        } else {
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
              return res.status(401).json({
                message: 'Auth failed'
              });
            }
            if (result) {
              const token = jwt.sign(user[0].toJSON(), process.env.JWT_KEY, { expiresIn: "1h" });
              return res.status(200).json({
                message: 'Auth successful',
                token: token
              })
            }
            res.status(401).json({
              message: 'Auth failed'
            })
          })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        })
      });
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.find().select('_id name phone email dob gender permission');
      res.status(200).json({
        count: users.length,
        users: users
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error
      })
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id }).select('_id name phone email dob gender permission');
      res.status(200).json({
        user: user
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error
      })
    }
  }
};
