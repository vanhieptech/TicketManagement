const monggose = require('mongoose');
const Schema = monggose.Schema;

const AirlineSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Airline_name is required'],
        unique: true
    },
    logo: {
        type: String,
        required: [true, 'Airline_logo is required']
    }
});

const Airline = monggose.model('airline', AirlineSchema);
module.exports = Airline;