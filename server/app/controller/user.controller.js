var express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const { create } = require("../models/user");
const { response } = require("express");

function compareNameAsc(a, b) {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

function compareNameDesc(a, b) {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  let comparison = 0;
  if (nameB > nameA) {
    comparison = 1;
  } else if (nameB < nameA) {
    comparison = -1;
  }
  return comparison;
}


module.exports = {
  postUser: (req, res) => {
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
              var now = new Date();
              var createddate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(),
                now.getHours(), now.getMinutes(), now.getSeconds()));
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                dob: moment.utc(req.body.dob, 'DD-MM-YYYY HH:mm:ss'),
                gender: req.body.gender,
                permission: 'ROLE_USER',
                createdDate: createddate,
                updatedDate: createddate
              });
              //Lưu user
              user.save().then(result => {
                res.status(201).json({
                  message: 'User created'
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
    //Sắp xếp và lọc
    const sortField = req.query.sortField;
    const orderBy = req.query.orderBy;
    const filterGender = req.query.filterGender;
    const filterDOB = req.query.filterDOB;
    try {
      let users = await User.find().select('_id name phone dob gender email permission createdDate updatedDate').exec();
      // Mặc định là sort theo tên tăng
      if (filterGender !== null && filterGender !== undefined) {
        if (filterGender == 'Nam') {
          users = users.filter(user => {
            return user.gender.valueOf() == 'Nam'
          });
        } else {
          users = users.filter(user => {
            return user.gender.valueOf() == 'Nữ'
          });
        }
      }
      if (filterDOB !== null && filterDOB !== undefined) {
        users = users.filter(user => +user.dob.getFullYear() == +filterDOB);
      }
      if (sortField !== null && sortField !== undefined) {
        if (sortField === 'name') {
          if (orderBy === 'asc') users.sort(compareNameAsc);
          else users.sort(compareNameDesc);
        } else if (sortField === 'createdDate') {// Sort các user đó theo ngày tạo
          if (orderBy === 'asc') {
            users.sort((a, b) => {
              return b.createdDate - a.createdDate;
            });
          } else {
            users.sort((a, b) => {
              return a.createdDate - b.createdDate;
            });
          }
        }
      }
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
      const user = await User.findOne({ _id: req.params.id }).select('_id name phone dob gender email permission createdDate updatedDate');
      res.status(200).json({
        user: user
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error
      })
    }
  },
  putUser: async (req, res) => {
    try {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashPassword;
      const updatedUser = await User.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
        .select('_id name phone dob gender email permission createdDate updatedDate');
      if (updatedUser) {
        res.status(200).json({
          message: 'User updated successfully',
          results: updatedUser
        });
      } else {
        res.status(200).json({
          message: 'User updated unsuccessful',
          results: false
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err
      })
    }
  },
  checkOldPassword: async (req, res) => {
    let user = await User.findById(req.params.id);
    //Kiểm tra mật khẩu cũ xem đúng không
    try {
      const results = bcrypt.compare(req.body.oldpassword, user.password);
      console.log(results);
      res.status(200).json({
        message: 'Old password correct',
        results: true
      })
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Old password incorrect',
        results: false
      })
    }
  }
};
