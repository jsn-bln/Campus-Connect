const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/userSchema');
const bcrypt = require('bcrypt');


router.post('/signup', (req, res) => {
    const {studentId, firstname, lastname, password, email, birthday, gender} = req.body;

    if (!studentId || !firstname || !lastname || !password || !email || !birthday || !gender) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if(mongoose.connection.readyState){
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if(err) return ;
            const user = new User({
                studentId,
                firstname,
                lastname,
                password: hashedPassword,
                email,
                birthday,
                gender
            })

            user
                .save()
                .then(() => {
                    res.status(201).json({ message: 'User registered successfully' });
                })
                .catch((err) => {
                    res.status(500).json({ error: err });
                })
        })
    }
    else{
        res.json({ 'message': 'Server connection error' });
    }

})





module.exports = router;


