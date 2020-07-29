const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const FlightSchema = new Schema({
    code: {
        type: String,
        required: [true, 'code is required'],
        // Tối đa 10 ký tự
        maxlength: [10, 'Max length of "code" is 10'],
        unique: true
    },
    departure_time: {
        type: Date,
        get: departure_time => {
            return moment.utc(departure_time).format('DD-MM-YYYY HH:mm:ss');
        },
        required: [true, 'type is required']
    },
    arrival_time: {
        type: Date,
        get: arrival_time => {
            return moment.utc(arrival_time).format('DD-MM-YYYY HH:mm:ss');
        },
        required: [true, 'type is required']
    },
    departure: {
        type: Schema.Types.ObjectId,
        ref: 'airport',
        required: [true, 'departure is required']
    },
    arrival: {
        type: Schema.Types.ObjectId,
        ref: 'airport',
        required: [true, 'airport is required']
    },
    pit_stop: [{
        type: Schema.Types.ObjectId,
        ref: 'airport',
        default: undefined
    }],
    aircraft: {
        type: Schema.Types.ObjectId,
        ref: 'aircraft',
        required: [true, 'aircraft is required']
    },
    seat_available: {
        type: Number,
        required: [true, 'seat available is required']
    },
    standardfare: [{
        type: Schema.Types.ObjectId,
        ref:'standardfare'
    }]
});

const Flight = mongoose.model('flight', FlightSchema);
module.exports = Flight;