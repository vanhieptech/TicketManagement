const monggose = require('mongoose');
const Schema = monggose.Schema;
var moment = require('moment');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        //Tối thiểu phải 6 ký tự
        minlength: [6, 'Name must have at least 6 character']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        //Tối thiểu phải 10 số
        minlength: [10, 'Phone must have at least 10 numbers']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        //Match regex email
        match: [/^[a-zA-Z0-9][a-zA-Z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/, 'Email address invalid']
    },
    dob: {
        type: Date,
        required: [true, 'Birth day is required'],
        // Nhỏ nhất phải 18 tuổi
        max: function () {
            var date = moment();
            date.set('year', date.get('year') - 18)
            return date.isAfter(this.dob);
        }
    },
    gender: {
        type: String,
        required: [true, 'Gender is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must have at least 8 character']
    }
});

const User = monggose.model('user', UserSchema);
module.exports = User;