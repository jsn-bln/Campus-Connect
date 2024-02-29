const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Post = require('../model/postSchema')
const User = require('../model/userSchema');
const { post } = require('./userRoutes');



router.post('/postComment', (req,res) =>{
    const { studentId, content } = req.body
    User.findOne({studentId}).then((user)=>{
        if(user == null){
            return res.status(404).json({
                "status":false,
                "message":"User not found"
            })
        }else{
            const newPost = new Post({
                studentId,
                content
            })

            newPost.save().then(() =>{
                res.status(201).json({
                    "status":true,
                    "message": "Post created successfully"
                })
            })
        }
    })
})



router.delete('/delete', (req,res) =>{
    const {id} = req.body;
    Post.findOneAndDelete({ _id : id}).then((post) =>{
        if(post == null) return res.status(404).json({"message":"Post not found"});
        res.status(200).json(post)
    }).catch((err)=>{
        res.status(500).json({message: err.message})
    })
})


module.exports = router