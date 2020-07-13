const monggose = require('mongoose');
const Schema = monggose.Schema;

const TicketSchema = new Schema({
    state: {
        type: Number,
        required: [true, 'State is required'],
    },
    passengerid: {
        type: String,
        required: [true, 'PassengerId is required']
    },
    flightid: {
        type: String,
        required: [true, 'FlightId is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    }
});

const Ticket = monggose.model('ticket', TicketSchema);
module.exports = Ticket;