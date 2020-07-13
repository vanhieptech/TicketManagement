const monggose = require('mongoose');
const Schema = monggose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    dob: {
        type: Date,
        required: [true, 'Birth day is required']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
});

const User = monggose.model('user', UserSchema);
module.exports = User;