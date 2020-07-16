const monggose = require('mongoose');
const Schema = monggose.Schema;

const AirportSchema = new Schema({
    code: {
        type: String,
        required: [true, 'Airport_code is required'],
        maxlength: [10,'Code max length is 10']
    },
    name: {
        type: String,
        required: [true, 'Airport_name is required'],
        maxlength: [100,'Code max length is 10']
    },
    location: {
        type: String,
        required: [true, 'Airport_location is required'],
        maxlength: [100,'Location max length is 10']
    }
});

const Airport = monggose.model('airport', AirportSchema);
module.exports = Airport;