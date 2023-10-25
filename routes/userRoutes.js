const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/userSchema');
const bcrypt = require('bcrypt');


router.post('/signup', (req, res) => {
    const {studentId, firstname, lastname, password, email, birthday, gender, accountType} = req.body;

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
                gender,
                accountType
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


router.post('/login', (req, res) => {
    const {email, password} = req.body;

    User.findOne({email})
        .then((user) => {
            if(user != null){
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) res.json({err})
                    if(result){
                        res.status(200).json({
                            "status": true,
                            "studentId" : user.studentId,
                            "firstname" : user.firstname,
                            "lastname" : user.lastname,
                            "email" : user.email,
                        })
                    }
                    else{
                        res.status(404).json({
                            "status" : false,
                            "message": "Invalid Username and password"
                        })
                    }
                })
            }
        })
        .catch((err) => { res.json({err})})
})

router.get('/admin/getusers', (req, res) => {
    User.find()
        .then( users => {
            if(users.length === 0) return res.status(404).json({ message : "No users found"});

            res.status(200).json(users);
        })
        .catch((err) => {
            return res.status(500).json(err);
        })
})



module.exports = router;


