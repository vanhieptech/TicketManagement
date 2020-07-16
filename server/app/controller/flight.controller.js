const Flight = require('../models/flight');
const moment = require('moment');
const { json } = require('body-parser');

module.exports = {
    getFlights: (req, res) => {
        Flight
            .find()
            .exec()
            .then(docs => {
                console.log(docs);
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
    },
    getFlight: (req, res) => {
        const id = req.params.id;
        Flight
            .findById(id)
            .exec()
            .then(doc => {
                console.log('From database' + doc);
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
    postFlight: (req, res) => {
        const flight = new Flight({
            code: req.body.code,
            take_off: moment(req.body.take_off),
            landing: moment(req.body.landing)
        });
        flight.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST request to /flight",
                createdFlight: result
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

    },
    deleteFlight: (req, res) => {
        const id = req.params.id;
        Flight
            .findOneAndRemove({ _id: id }, { new: true, useFindAndModify: false })
            .exec()
            .then(doc => {
                console.log(doc);
                res.status(200).json(doc);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    },
    putFlight: (req, res) => {
        const id = req.params.id;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        Flight.findOneAndUpdate({ _id: id }, { $set: updateOps }, { new: true })
            .exec()
            .then(doc => {
                console.log(doc);
                res.status(200).json(doc)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    }
}