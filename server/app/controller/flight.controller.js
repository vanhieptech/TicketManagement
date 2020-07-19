const Flight = require('../models/flight');
const moment = require('moment');
const { populate } = require('../models/flight');

module.exports = {
    getFlights: (req, res) => {
        Flight
            .find()
            .select('_id code departure_time arrival_time departure arrival pit_stop aircraft')
            .populate({
                path: 'pit_stop arrival departure',
                select: '_id code name location'
            })
            .populate({
                path: 'aircraft',
                select: '_id code airline seats',
                populate: {
                    path: 'airline seats',
                    select: '_id name logo type seat_number price aircraft'
                }
            })
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
                            departure_time: doc.departure_time,
                            arrival_time: doc.arrival_time,
                            departure: doc.departure,
                            arrival: doc.arrival,
                            pit_stop: doc.pit_stop,
                            aircraft: doc.aircraft
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
            .select('_id code departure_time arrival_time departure arrival pit_stop aircraft')
            .populate({
                path: 'pit_stop arrival departure',
                select: '_id code name location'
            })
            .populate({
                path: 'aircraft',
                select: '_id code airline seats',
                populate: {
                    path: 'airline seats',
                    select: '_id name logo type seat_number price aircraft'
                }
            })
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json({
                        _id: doc._id,
                        code: doc.code,
                        departure_time: doc.departure_time,
                        arrival_time: doc.arrival_time,
                        departure: doc.departure,
                        arrival: doc.arrival,
                        pit_stop: doc.pit_stop,
                        aircraft: doc.aircraft
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
            departure_time: moment.utc(req.body.departure_time, 'DD-MM-YYYY HH:mm:ss'),
            arrival_time: moment.utc(req.body.arrival_time, 'DD-MM-YYYY HH:mm:ss'),
            departure: req.body.departure,
            arrival: req.body.arrival,
            pit_stop: req.body.pit_stop,
            aircraft: req.body.aircraft
        });
        flight.save().then(result => {
            res.status(201).json({
                message: "Flight created successfully",
                createdFlight: {
                    _id: result._id,
                    code: result.code,
                    departure_time: result.departure_time,
                    arrival_time: result.arrival_time,
                    departure: result.departure,
                    arrival: result.arrival,
                    pit_stop: result.pit_stop,
                    aircraft: result.aircraft
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/api/flight/' + result._id,
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
            .select('_id code departure_time arrival_time departure arrival pit_stop aircraft')
            .populate({
                path: 'pit_stop arrival departure',
                select: '_id code name location'
            })
            .populate({
                path: 'aircraft',
                select: '_id code airline seats',
                populate: {
                    path: 'airline seats',
                    select: '_id name logo type seat_number price aircraft'
                }
            })
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: 'Flight deleted successfully',
                    deletedFlight: doc,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:4000/api/flight',
                        body: {
                            code: 'String',
                            departure_time: 'Date',
                            arrival_time: 'Date',
                            departure: 'ObjectId_Airport',
                            arrival: 'ObjectId_Airport',
                            pit_stop: 'Arrays of ObjectId_Airport',
                            aircraft: 'ObjectId_Aircraft'
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
        // const updateOps = {};
        // for (const ops of req.body) {
        //     if (ops.propName !== "take_off" && ops.propName !== "landing") {
        //         updateOps[ops.propName] = ops.value;
        //     } else {
        //         updateOps[ops.propName] = moment.utc(ops.value, 'DD-MM-YYYY HH:mm:ss');
        //     }
        // }
        if (req.body.departure_time !== undefined) {
            req.body.departure_time = moment.utc(req.body.departure_time, 'DD-MM-YYYY HH:mm:ss');
        }
        if (req.body.arrival_time !== undefined) {
            req.body.arrival_time = moment.utc(req.body.arrival_time, 'DD-MM-YYYY HH:mm:ss');
        }
        Flight.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
            .select('_id code departure_time arrival_time departure arrival pit_stop aircraft')
            .populate({
                path: 'pit_stop arrival departure',
                select: '_id code name location'
            })
            .populate({
                path: 'aircraft',
                select: '_id code airline seats',
                populate: {
                    path: 'airline seats',
                    select: '_id name logo type seat_number price aircraft'
                }
            })
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: 'Flight updated successfully',
                    updatedFlight: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/api/flight/' + doc._id
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