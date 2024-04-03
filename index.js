const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes')
const itemRoutes = require('./routes/itemRoutes')
const courseRoutes = require('./routes/courseRoute')
const postRoutes = require('./routes/postRoute')
const privateMessage = require('./model/privateMessageSchema')
const groupRoutes = require('./routes/groupRoute')

 
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
app.use('/api/v1/group', groupRoutes)



const express_server = app.listen(port, () => {
    console.log(`listening on port:${port}`)
})

const ioServer = require('socket.io')(express_server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});



ioServer.on('connection', (socket)=>{


    console.log(`New user connected: ${socket.id}`)

    socket.on('create_room', ({userId})=>{
        console.log('Create a room for user ID:', userId)
        const roomId = `room_${userId}`
        
        socket.join(roomId)
        socket.emit('room_created', roomId)
        console.log('room created:', roomId)
        
    })



    socket.on('private_message', async (data) =>{
        try{
            const {from_user,to_user, room_id, message} = data
            
            // save the private msg to the database
            console.log(from_user, to_user, message, room_id)
            const newMessage = new privateMessage({
                from_user,
                to_user,
                room_id,
                message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            });

            await newMessage.save();
    
            

            ioServer.to(room_id).emit('private_message', {from_user, message})

        
        }catch(error){
            console.error("Error has occurred: ", error)
        }
    } )

    socket.on('disconnect', ()=>{
        console.log('Client disconnected:', socket.id)
    } )
})



