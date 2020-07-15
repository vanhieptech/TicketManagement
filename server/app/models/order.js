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
    payment: { type: Schema.Types.ObjectId, ref: 'payment' }
});

const Order = monggose.model('order', OrderSchema);
module.exports = Order;