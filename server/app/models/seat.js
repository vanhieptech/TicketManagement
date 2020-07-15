const monggose = require('mongoose');
const Schema = monggose.Schema;

const SeatSchema = new Schema({
    flight: { type: Schema.Types.ObjectId, ref: 'flight' },
    type: {
        type: String,
        required: [true, 'type is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    seat_number: {
        type: Number,
        required: [true, 'seatnumber is required']
    }
});

const Seat = monggose.model('seat', SeatSchema);
module.exports = Seat;