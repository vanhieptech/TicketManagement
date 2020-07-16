const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
    code: {
        type: String,
        required: [true, 'code is required'],
        // Tối đa 10 ký tự
        maxlength: [10, 'Max length of "code" is 10']
    },
    take_off: {
        type: Date,
        required: [true, 'type is required']
    },
    landing: {
        type: Date,
        required: [true, 'type is required']
    },
    departure: { 
        type: Schema.Types.ObjectId, 
        ref: 'airport',
        // required: [true, 'departure is required']
    },
    arrival: {
        type: Schema.Types.ObjectId, 
        ref: 'airport',
        // required: [true, 'airport is required']
    },
    pit_stop: [{
        type: String,
    }],
    seat_availabilty:{
        type: Number
    }
});

const Flight = mongoose.model('flight', FlightSchema);
module.exports = Flight;