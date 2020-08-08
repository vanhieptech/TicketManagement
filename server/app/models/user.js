const monggose = require('mongoose');
const Schema = monggose.Schema;
const moment = require('moment');

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
        match: [/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, 'Email address invalid']
    },
    dob: {
        type: String,
        required: [true, 'Birth day is required'],
        minlength: [10, 'DOB must have at least 10 character']
        // Nhỏ nhất phải 18 tuổi
        // max: function () {
        //     var eightyYearsAgo = new Date();
        //     eightyYearsAgo.setFullYear(eightyYearsAgo.getFullYear() - 18);
        //     console.log(eightyYearsAgo);
        //     return eightyYearsAgo;
        // }
    },
    gender: {
        type: String,
        required: [true, 'Gender is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must have at least 8 character']
    },
    permission: {
        type: 'String',
        default: 'ROLE_USER'
    },
    createdDate: {
        type: Date,
        // default: moment.utc(Date.format(),'DD-MM-YYYY HH:mm:ss')
    },
    updatedDate: {
        type: Date,
        // default: moment.utc(Date.now(),'DD-MM-YYYY HH:mm:ss')
    }
});

const User = monggose.model('user', UserSchema);
module.exports = User;