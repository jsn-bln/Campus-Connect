const mongoose = require('mongoose')

const groupSchema = mongoose.Schema({
    groupName:{
        type:String,
        maxlength:100
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    date_created:{
        type:Date,
        default:Date.now
    }
})

const group = mongoose.model('group', groupSchema)

module.exports = group