const monggose = require('mongoose');
const Schema = monggose.Schema;

const PassengerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'PassengerName is required'],
    },
    dob: {
        type: Date,
        required: [true, 'DOB is required']
    },
    luggage: {
        type: Number,
        required: [true, 'Luggage is required']
    },
    extra_luggage: {
        type: Number,
        required: [true, 'Extra_luggage is required']
    },
    priority_boarding: {
        type: Number,
        required: [true, 'Price is required']
    }
});

const Passenger = monggose.model('passenger', PassengerSchema);
module.exports = Passenger;