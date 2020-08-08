const Aircraft = require('../models/aircraft');
const Airline = require('../models/airline')
const mongoose = require('mongoose');
const Seat = require('../models/seat');
const { all } = require('../routes/home.route');

module.exports = {
    getAircrafts: (req, res) => {
        Aircraft
            .find()
            .select('_id code airline seats')
            .populate('seats', '_id type price seat_number aircraft')
            .exec()
            .then(docs => {
                const response = {
                    code: 200,
                    message: "Get aircraft successfully",
                    results: docs
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
    getAircraft: (req, res) => {
        const id = req.params.id;
        Aircraft
            .findById(id)
            .select('_id code airline seats')
            .populate('seats', '_id type price seat_number aircraft')
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json({
                        code: 200,
                        message: "Get aircraft successfully",
                        results: doc});
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
    postAircraft: (req, res) => {
        // fe gửi lên tên của airline => tìm _id của airline đó
        Airline.findOne({ name: req.body.airline }, '_id name', (err, airline) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: 'Airline not found'
                })
            }

            const aircraft = new Aircraft({
                _id: new mongoose.Types.ObjectId(),
                code: req.body.code,
                airline: airline._id,
            });
            aircraft.save().then(result => {
                // Tạo và lưu seats trong aircraft
                const seat_numbers = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3', 'E1', 'E2', 'E3',
                    'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'H1', 'H2', 'H3', 'I1', 'I2', 'I3', 'J1', 'J2', 'J3'];
                for (i = 0; i < seat_numbers.length; i++) {
                    let flag = 0; // Hạng ghế phổ thông
                    if (seat_numbers[i].endsWith('1')) { // Hạng ghế thương gia
                        flag = 1;
                    }
                    // Mỗi hãng bay thì có giá các hạng ghế khác nhau
                    let price, price1;
                    if (result.code.indexOf('VA') !== -1) {
                        price = '1550000';
                        price1 = '750000';
                    } else if (result.code.indexOf('VJ') !== -1) {
                        price = '1250000';
                        price1 = '650000';
                    } else if (result.code.indexOf('BB') !== -1) {
                        price = '1450000';
                        price1 = '800000';
                    }
                    const seat = new Seat({
                        type: flag === 1 ? 'Thương gia' : 'Phổ thông',
                        price: flag === 1 ? price : price1,
                        seat_number: seat_numbers[i],
                        aircraft: result._id
                    });
                    seat.save().then(seat => {
                        console.log('seat ' + seat.seat_number + ' saved');
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    });
                    // result.seats.push({ _id: seat._id });
                }
                //Lưu seats thành công
                // return result.save();
                //Success
                res.status(201).json({
                    code: 201,
                    message: "Aircraft created successfully",
                    results: {
                        _id: result._id,
                        code: result.code,
                        airline: result.airline,
                        // seats: result.seats
                    },
                })
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
        })
    },
    deleteAircraft: (req, res) => {
        const id = req.params.id;
        Aircraft
            .findOneAndRemove({ _id: id }, { new: true, useFindAndModify: false })
            .select('_id code airline seats')
            .populate('seats', '_id type price seat_number aircraft')
            .exec()
            .then(doc => {
                res.status(200).json({
                    code: 200,
                    message: 'Aircraft deleted successfully',
                    results: doc,
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    },
    putAircraft: (req, res) => {
        const id = req.params.id;
        Aircraft.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
            .select('_id code airline seats')
            .populate('seats', '_id type price seat_number aircraft')
            .exec()
            .then(doc => {
                res.status(200).json({
                    code: 200,
                    message: 'Aircraft updated successfully',
                    results: doc,
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