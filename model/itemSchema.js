const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({

    studentId: {
        type: Number,
        required: true
    },
    itemName: {
        type: String,
        required: true,
        maxLength: 20
    },
    itemDescription: {
        type: String,
        required: true,
        maxLength: 200
    },
    itemPrice: {
        type: Number,
        required: true
    },
    itemQuantity: {
        type: Number,
        required: true
    },
    itemCondition: {
        type: String,
        enum: ['New', 'Used','Like New'],
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    itemStatus: {
        type: String,
        enum: ['Available', 'Sold'],
        default: 'Available'
    },
    itemImage:{
        type: String
    }

});



const Item = mongoose.model('Item', itemSchema);
module.exports = Item;