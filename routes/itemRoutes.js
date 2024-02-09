const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('../model/itemSchema');
const User = require('../model/userSchema');
const upload = require('../middleware/upload');

// create  new item posting
router.post('/postItem', upload.single('itemImage'),(req, res) => {
    const { studentId, itemName, itemDescription, itemPrice, itemQuantity, itemCondition} = req.body;

    User.findOne({studentId})
        .then((user) => {
            if(user == null){
                return res.status(404).json({
                    "status" : false,
                    "message": "User not found"
                })
            }
            else{
                const newItem = new Item({
                    studentId,
                    itemName,
                    itemDescription,
                    itemPrice,
                    itemQuantity,
                    itemCondition,
                    itemImage: req.file.path
                    })
                

                newItem
                    .save()
                    .then(() => {
                        res.status(201).json({
                            "status" : true,
                            "message" : "Item added successfully"
                        })
                    })
            }
        })
})

// get all items
router.get('/items', (req, res) => {
    Item.find()
        .then((items) => {
            if(items.length === 0) return res.status(404).json({ message : "No items found"});

            res.status(200).json(items);
        })
})

// get item by item name
router.get('/search', (req, res) => {
    const {itemName} = req.body;
    Item.find({itemName})
        .then((items) => {
            if(items.length === 0) return res.status(404).json({ message : "No items found"});
            res.status(200).json(items);
        })
        .catch((err) => {
             res.status(500).json({ message : err.message});
         })

})

// get items posted by a user
router.get('/account/items', (req, res) => {
    const {studentId} = req.body;
    Item.find({studentId})
      .then((items) => {
            if(items.length === 0) return res.status(404).json({ message : "No items found"});
            res.status(200).json(items);
        })
      .catch((err) => {
             res.status(500).json({ message : err.message});
         })

})

// delete an item
router.delete('/delete', (req, res) => {
    const {id} = req.body;
    Item.findOneAndDelete({ _id : id})
      .then((item) => {
            if(item == null) return res.status(404).json({ message : "Item not found"});
            res.status(200).json(item);
        })
      .catch((err) => {
             res.status(500).json({ message : err.message});
         })
})

// update an item
router.put('/update', (req, res) => {
    const {id, itemName, itemDescription, itemPrice, itemQuantity, itemCondition} = req.body;
    Item.findOneAndUpdate({ _id : id}, {itemName, itemDescription, itemPrice, itemQuantity, itemCondition, itemImage})
    .then((item) => {
            if(item == null) return res.status(404).json({ message : "Item not found"});
            res.status(200).json(item);
        })
    .catch((err) => {
             res.status(500).json({ message : err.message});
         })
})

// get an specific item using id
router.post('/search/id', (req, res) => {
    const { id } = req.body;
    Item.findById(id)
        .then((item) => {
            if (!item) return res.status(404).json({ message: "Item not found" });
            res.status(200).json(item);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});





module.exports = router;