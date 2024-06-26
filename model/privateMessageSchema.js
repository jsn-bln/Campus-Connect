const mongoose = require('mongoose')


const privateMessageSchema = mongoose.Schema({
    from_user:{
        type:String,
    },
    to_user:{
        type:String,
    },
    message:{
        type:String,
    },
    date_sent:{
        type:Date,
        default:Date.now
    }
})


const PrivateMessage = mongoose.model('PrivateMessage', privateMessageSchema)

module.exports = PrivateMessage


