const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes')
const itemRoutes = require('./routes/itemRoutes')
const courseRoutes = require('./routes/courseRoute')
const postRoutes = require('./routes/postRoute')
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors());


const port = process.env.port || 8080;
const uri = process.env.URI;


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.once('open', () => { console.log('connected to mongodb!')})



app.use('/api/v1/user', userRoutes);
app.use('/api/v1/marketplace',itemRoutes);
app.use('/api/v1/course',courseRoutes);
app.use('/api/v1/post', postRoutes)


app.listen(port, () => {
    console.log(`listening on port:${port}`)
})