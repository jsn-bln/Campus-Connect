const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Group = require('../model/groupSchema')
const User = require('../model/userSchema');

router.get('/getGroups', (req, res) => {
    Group.find().populate('users')
        .then( groups => {
            if(groups.length === 0) return res.status(404).json({ message : "No groups found"});

            res.status(200).json(groups);
        })
        .catch((err) => {
            return res.status(500).json(err);
        })
})

router.post('/create', async(req,res)=>{
    const {groupName} = req.body;
    try{
        const newGroup = new Group({groupName: groupName})
        await newGroup.save();
        res.status(201).json({message:'Group created!'})

    }catch(error){
        console.log('error creating group', error)
        return res.status(500).json(error)
    }
})

module.exports = router;