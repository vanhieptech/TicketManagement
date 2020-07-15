const monggose = require('mongoose');
const Schema = monggose.Schema;

const AirportSchema = new Schema({
    code: {
        type: String,
        required: [true, 'Airport_code is required']
    },
    name: {
        type: String,
        required: [true, 'Airport_name is required']
    },
    Location: {
        type: Number,
        required: [true, 'Airport_location is required']
    }
});

const Airport = monggose.model('airport', AirportSchema);
module.exports = Airport;