const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    studentId:{
        type: Number,
        ref:'User',
        required:true
    },
    firstname:{
        type:String,
        ref:'User',
        required:true
    },
    lastname:{
        type:String,
        ref:'User',
        required:true
        
    },

    content:{
        type:String,
        required:true,
        maxLength:100

    }
   



})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;