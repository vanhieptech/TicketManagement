const Flight = require('../models/flight');
const moment = require('moment');

module.exports = {
    getFlights: (req, res) => {
        Flight
            .find()
            .select('_id code take_off landing')
            .exec()
            .then(docs => {
                if (docs === undefined) {
                    res.status(200).json({
                        count: docs.length,
                        flights: []
                    })
                }
                const response = {
                    count: docs.length,
                    flights: docs.map(doc => {
                        return {
                            _id: doc._id,
                            code: doc.code,
                            take_off: doc.take_off,
                            landing: doc.landing
                        }
                    })
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
    getFlight: (req, res) => {
        const id = req.params.id;
        Flight
            .findById(id)
            .select('_id code take_off landing')
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json({
                        _id: doc._id,
                        code: doc.code,
                        take_off: doc.take_off,
                        landing: doc.landing
                    });
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
            take_off: moment.utc(req.body.take_off, 'DD-MM-YYYY HH:mm:ss'),
            landing: moment.utc(req.body.landing, 'DD-MM-YYYY HH:mm:ss')
        });
        flight.save().then(result => {
            res.status(201).json({
                message: "Flight created successfully",
                createdFlight: {
                    _id: result._id,
                    code: result.code,
                    take_off: result.take_off,
                    landing: result.landing
                }
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
            .select('_id code take_off landing')
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: 'Flight deleted successfully',
                    deletedFlight: doc,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:4000/flight',
                        body: {
                            code: 'String',
                            take_off: 'Date',
                            landing: 'Date'
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
    putFlight: (req, res) => {
        const id = req.params.id;
        const updateOps = {};
        for (const ops of req.body) {
            if(ops.propName !== "take_off" && ops.propName !== "landing"){
                updateOps[ops.propName] = ops.value;
            }else{
                updateOps[ops.propName] = moment.utc(ops.value,'DD-MM-YYYY HH:mm:ss');
            }
        }
        Flight.findOneAndUpdate({ _id: id }, { $set: updateOps }, { new: true, useFindAndModify: false})
            .select('_id code take_off landing')
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: 'Flight updated successfully',
                    updatedFlight: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/flight/' + doc._id
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