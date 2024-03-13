const mongoose = require('mongoose')

const groupMessageSchema = mongoose.Schema({
    from_user:{
        type:String,
        length:100
    },
    room:{
        type:String,
        unique:true
    },
    message:{
        type:String,
        length:100
    },
    date_sent:{
        type:Date,
        default:Date.now
    }
})

groupMessage = mongoose.model('groupMessage', groupMessageSchema)

module.exports = groupMessage