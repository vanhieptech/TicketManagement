const Airline = require('../models/airline');
const moment = require('moment');
const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');

module.exports = {
    getAirlines: (req, res) => {
        Airline
            .find()
            .select('_id name logo')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    airlines: docs
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
    getAirline: (req, res) => {
        const id = req.params.id;
        Airline
            .findById(id)
            .select('_id name logo')
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
    postAirline: (req, res) => {
        console.log(req.file);
        const airline = new Airline({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            logo: req.file.path
        });
        airline.save().then(result => {
            res.status(201).json({
                message: "Airline created successfully",
                createdAirline: {
                    _id: result._id,
                    code: result.code,
                    logo: result.logo
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/api/airline/' + result._id,
                }
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

    },
    deleteAirline: (req, res) => {
        const id = req.params.id;
        Airline
            .findOneAndRemove({ _id: id }, { new: true, useFindAndModify: false })
            .select('_id name logo')
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: 'Airline deleted successfully',
                    deletedAirline: doc,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:4000/api/airline',
                        body: {
                            name: 'String',
                            location: 'String'
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
    putAirline: (req, res) => {
        const id = req.params.id;
        // const updateOps = {};
        // for (const ops of req.body) {
        //     updateOps[ops.propName] = ops.value;
        // }
        // { $set: updateOps }
        let updates;
        if (req.body.name === null || req.body.name === undefined) {
            updates = {
                logo: req.file.path
            }
        } else {
            updates = {
                name: req.body.name,
                logo: req.file.path
            }
        }
        Airline.findOneAndUpdate({ _id: id }, updates, { new: true, useFindAndModify: false })
            .select('_id name logo')
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: 'Airline updated successfully',
                    updatedAirline: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/api/airline/' + doc._id
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