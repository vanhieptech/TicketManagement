const Admin = require('../models/admin');
const moment = require('moment');
const mongoose = require('mongoose');

module.exports = {
    getAdmins: (req, res) => {
        Admin
            .find()
            .select('_id permission user')
            .populate('user', '_id name phone email dob gender password')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    aircraft: docs
                }
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
    },
    getAdmin: (req, res) => {
        const id = req.params.id;
        Admin
            .findById(id)
            .select('_id permission user')
            .populate('user', '_id name phone email dob gender password')
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res.status(404).json({
                        error: "No valid document found for provided id"
                    })
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    },
    postAdmin: (req, res) => {
        const admin = new Admin({
            _id: new mongoose.Types.ObjectId(),
            user: req.body.user,
            permission: 1
        });
        admin.save().then(result => {
            res.status(201).json({
                message: "Admin created successfully",
                createdAdmin: {
                    _id: result._id,
                    user: result.user,
                    permission: result.permission
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/api/admin/' + result._id,
                }
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

    },
    deleteAdmin: (req, res) => {
        const id = req.params.id;
        Admin
            .findOneAndRemove({ _id: id }, { new: true, useFindAndModify: false })
            .select('_id permission user')
            .populate('user', '_id name phone email dob gender password')
            .then(doc => {
                res.status(200).json({
                    message: 'Admin deleted successfully',
                    deletedAdmin: doc,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:4000/api/admin',
                        body: {
                            permission: 'String',
                            user: 'ObjectId'
                        }
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    },
    putAdmin: (req, res) => {
        const id = req.params.id;
        Admin.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
            .select('_id permission user')
            .populate('user', '_id name phone email dob gender password')
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: 'Admin updated successfully',
                    updatedAdmin: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/api/admin/' + doc._id
                    }
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    }
}