const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    studentId: {
        type: Number,
        require: true,
        unique: true,
        length: 9
    },
    firstname: {
        type: String,
        required: true,
        maxLength: 20
    },
    lastname: {
        type: String,
        required: true,
        maxLength: 20
    },
    password: {
        type: String,
        required: true,
        maxLength: 60,
        minLength: 5
    },
    email: {
        type: String,
        required: true,
        maxLength: 20,
        unique: true
    },
    birthday: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;