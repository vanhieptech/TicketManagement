const monggose = require('mongoose');
const Schema = monggose.Schema;

const TicketSchema = new Schema({
    state: {
        type: Boolean,
        required: [true, 'State is required'],
    },
    passenger: { type: Schema.Types.ObjectId, ref: 'passenger' },
    flight: { type: Schema.Types.ObjectId, ref: 'flight' },
    seat: { type: Schema.Types.ObjectId, ref: 'seat' },
});

const Ticket = monggose.model('ticket', TicketSchema);
module.exports = Ticket;