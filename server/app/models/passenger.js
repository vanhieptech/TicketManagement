const monggose = require('mongoose');
const Schema = monggose.Schema;

const PassengerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'PassengerName is required'],
        //Tối thiểu phải 6 ký tự
        minlength: [6,'Name must have at least 6 character']
    },
    dob: {
        type: Date,
        required: [true, 'DOB is required'],
        // Nhỏ nhất phải 18 tuổi
        max: function (){
            var date = moment();
            date.set('year',date.get('year') - 18)
            return date.isAfter(this.dob);
        }
    },
    luggage: {
        type: Number,
        required: [true, 'Luggage is required']
    },
    extra_luggage: {
        type: Number,
        required: [true, 'Extra_luggage is required']
    },
    priority_boarding: {
        type: Number,
        required: [true, 'Priority_boarding is required']
    }
});

const Passenger = monggose.model('passenger', PassengerSchema);
module.exports = Passenger;