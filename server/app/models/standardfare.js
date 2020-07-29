const monggose = require('mongoose');
const Schema = monggose.Schema;

const StandardFareSchema = new Schema({
    seat_type: {
        type: String,
        required: [true, 'seat_type is required']
    },
    price_per_minute: {
        type: Number,
        required: true
    },
    airline:{
        type: Schema.Types.ObjectId,
        ref:'airline',
        required: true
    }
});

const StandardFare = monggose.model('standardfare', StandardFareSchema);
module.exports = StandardFare;