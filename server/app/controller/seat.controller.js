const Seat = require('../models/seat');

module.exports = {
    getSeats: (req, res) => {
        Seat
            .find()
            .select('_id type price seat_number aircraft')
            .populate({
                path: 'aircraft',
                select: '_id code airline seats',
                populate: { path: 'airline', select: '_id name logo' }
            })
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    seats: docs
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
    getSeat: (req, res) => {
        const id = req.params.id;
        Seat
            .findById(id)
            .select('_id type price seat_number aircraft')
            .populate({
                path: 'aircraft',
                select: '_id code airline seats',
                populate: { path: 'airline', select: '_id name logo' }
            })
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
    postSeat: (req, res) => {
        const seat = new Seat({
            type: req.body.type,
            price: req.body.price,
            seat_number: req.body.seat_number,
            aircraft: req.body.aircraft
        });
        seat.save().then(result => {
            res.status(201).json({
                message: "Seat created successfully",
                createdSeat: {
                    _id: result._id,
                    type: result.type,
                    price: result.price,
                    seat_number: result.seat_number,
                    aircraft: result.aircraft
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/api/seat/' + result._id,
                }
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

    },
    deleteSeat: (req, res) => {
        const id = req.params.id;
        Seat
            .findOneAndRemove({ _id: id }, { new: true, useFindAndModify: false })
            .select('_id type price seat_number aircraft')
            .populate({
                path: 'aircraft',
                select: '_id code airline seats',
                populate: { path: 'airline', select: '_id name logo' }
            })
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: 'Seat deleted successfully',
                    deletedSeat: doc,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:4000/api/seat',
                        body: {
                            type: 'String',
                            price: 'Number',
                            seat_number: 'String',
                            aircraft: 'ObjectId'
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
    putSeat: (req, res) => {
        const id = req.params.id;
        Seat.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
            .select('_id type price seat_number aircraft')
            .populate({
                path: 'aircraft',
                select: '_id code airline seats',
                populate: { path: 'airline', select: '_id name logo' }
            })
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: 'Seat updated successfully',
                    updatedSeat: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/api/seat/' + doc._id
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