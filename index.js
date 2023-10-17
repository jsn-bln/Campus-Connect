const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
app.use(express.json());



const port = process.env.port || 8080;
const uri = process.env.URI;


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.once('open', () => { console.log('connected to mongodb!')})



app.listen(port, () => {
    console.log(`listening on port:${port}`)
})