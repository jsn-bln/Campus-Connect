const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    studentId:{
        type: Number,
        required:true,
        ref:'User'
    },

    content:{
        type:String,
        required:true,
        maxLength:100

    }
   



})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;