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




router.delete('/:postId', async (req,res) =>{
    const postId = req.params.postId;
    const studentId = req.body.studentId
    try{
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({
                status:false,
                message:'Post not found.'
            })
        }
        console.log("student id", studentId)
        console.log("student id from post", post.studentId)

        if(post.studentId !== studentId){ // compare studentid with post's studentid
            return res.status(403).json({
                status:false,
                message:'You are not authorized to delete this post.'
            })
        }
       

        await post.deleteOne();
        return res.status(200).json({
            status:true,
            message:"Post deleted successfully",
            deletedPost:post,
        })
    }catch(error){
        console.error("Error has occurred: ", error)
    }
})


module.exports = router