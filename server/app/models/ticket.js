const monggose = require('mongoose');
const Schema = monggose.Schema;

const TicketSchema = new Schema({
    flight: { type: Schema.Types.ObjectId, ref: 'flight', required: [true,'ticket_flight is required'] },
    seat: { type: Schema.Types.ObjectId, ref: 'seat' , required: [true,'ticket_seat is required']},
    order: { type: Schema.Types.ObjectId, ref: 'order'},
});

const Ticket = monggose.model('ticket', TicketSchema);
module.exports = Ticket;