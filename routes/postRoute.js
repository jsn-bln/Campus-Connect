const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Post = require('../model/postSchema')
const User = require('../model/userSchema');
const { post } = require('./userRoutes');



router.get('/posts', async (req,res)=>{
    try{
        const posts = await Post.find();
        res.status(200).json(posts);

    }catch(error){
        console.log('error getting posts: ', error)
    }
})

router.post('/postComment', async (req,res) =>{
    const {firstname,lastname,studentId, content } = req.body

    // lastname, studentId
    try{
        const user = await User.findOne({studentId})
        if(user == null){
            return res.status(404).json({
                "status":false,
                "message":"user not found"
            })
        }

        const newPost = new Post({
            studentId,
            lastname,
            firstname,
            content
        })
        await newPost.save();


        res.status(201).json({
            "status":true,
            "message": "Post created successfully",
            "post": newPost
        })

        
            
    
    
    }catch(error){
        console.error('Error creating post: ', error)
        res.status(500).json({"status":false, "message":"error has occurred"})
    }
   
           
        
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