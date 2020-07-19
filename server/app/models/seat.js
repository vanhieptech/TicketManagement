const monggose = require('mongoose');
const Schema = monggose.Schema;

const SeatSchema = new Schema({
    type: {
        type: String,
        required: [true, 'type is required']
    },
    seat_number: {
        type: String,
        required: [true, 'seatnumber is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    aircraft: {
        type: Schema.Types.ObjectId,
        ref: 'aircraft',
        required: true,
    }
});

const Seat = monggose.model('seat', SeatSchema);
module.exports = Seat;