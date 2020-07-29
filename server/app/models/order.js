const monggose = require('mongoose');
const Schema = monggose.Schema;

const OrderSchema = new Schema({
    code: {
        type: Number,
        required: [true, 'Code is required'],
        min: 0
    },
    total: {
        type: Number,
        required: [true, 'Total is required'],
        min: 0
    },
    status: {
        type: String,
        required: [true, 'Status is required']
    },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    flight: { type: Schema.Types.ObjectId, ref: 'flight' },
    tickets: [{ type: Schema.Types.ObjectId, ref: 'ticket' }],
    payment: { type: Schema.Types.ObjectId, ref: 'payment' },
    passengers: [{
        name: {
            type: String,
            required: [true, 'Passenger_name is required'],
            min: 0
        },
        identity_card: {
            type: String,
            required: [true, 'Passenger_identity_card is required'],
            minlength: 0
        },
        luggage: {
            type: Number,
            default: 0
        },
        priority_boarding: {
            type: Number,
            default: 0
        },
    }]
});

const Order = monggose.model('order', OrderSchema);
module.exports = Order;