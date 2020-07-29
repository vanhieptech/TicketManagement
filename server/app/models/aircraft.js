const monggose = require('mongoose');
const Schema = monggose.Schema;

const AircraftSchema = new Schema({
    code: {
        type: String,
        required: [true, 'Aircraft_code is required'],
        unique: true
    },
    airline: {
        type: Schema.Types.ObjectId,
        ref: 'airline',
        required: [true, 'Aircraft_airline is required']
    },
    seats:[{
        type: Schema.Types.ObjectId,
        ref: 'seat',
        required: [true, 'Aircraft_seat is required']
    }]
});

const Aircraft = monggose.model('aircraft', AircraftSchema);
module.exports = Aircraft;