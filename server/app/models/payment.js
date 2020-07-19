const monggose = require('mongoose');
const Schema = monggose.Schema;

const PaymentSchema = new Schema({
    card_id: {
        type: String,
        required: [true, 'card_id is required']
    },
    user_name: {
        type: String,
        required: [true, 'username is required']
    },
    amount: {
        type: Number,
        required: [true, 'amount is required']
    }
});

const Payment = monggose.model('payment', PaymentSchema);
module.exports = Payment;