const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const FlightSchema = new Schema({
    code: {
        type: String,
        required: [true, 'code is required'],
        // Tối đa 10 ký tự
        maxlength: [10, 'Max length of "code" is 10']
    },
    take_off: {
        type: Date,
        get: take_off => {
            return moment.utc(take_off).format('DD-MM-YYYY HH:mm:ss');
        },
        required: [true, 'type is required']
    },
    landing: {
        type: Date,
        get: landing => {
            return moment.utc(landing).format('DD-MM-YYYY HH:mm:ss');
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
        required: [true, 'airport is required'],
        default: undefined
    }],
    // seat_availability: {
    //     type: Number
    // }
});

const Flight = mongoose.model('flight', FlightSchema);
module.exports = Flight;