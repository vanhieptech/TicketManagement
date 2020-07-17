const Airline = require('../models/airline');
const moment = require('moment');

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
        const airline = new Airline({
            code: req.body.code,
            name: req.body.name,
            location: req.body.location
        });
        airline.save().then(result => {
            res.status(201).json({
                message: "Airline created successfully",
                createdAirline: {
                    _id: result._id,
                    code: result.code,
                    name: result.name,
                    location: result.location
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
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        Airline.findOneAndUpdate({ _id: id }, { $set: updateOps }, { new: true, useFindAndModify: false })
            .select('_id code name location')
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