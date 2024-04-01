import * as React from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client'
import axios from  'axios'
import { Paper, Box, Typography, Button, IconButton, TextField, Divider, Grid, Container } from '@mui/material';

import { Link } from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
const URL = "http://localhost:8080"
const socket = io(URL,{autoConnect:false, transports: ['websocket']});

function Messages(){
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const userData = JSON.parse(localStorage.getItem('userData'));
    const { _id ,email, firstname, lastname, studentId }  = userData;
    
    const [searchResults, setSearchResults] = useState([])
    const [fullname, setFullName] = useState('')
    const [recipientUserId, setRecipientUserId] = useState('')
    const [recipientName, setRecipientName] = useState('')
    const [recipientRoomId, setRecipientRoomId] = useState('')

    
    const [chatOpen, setChatOpen] = useState(false)

   

    const fetchUsers = async () =>{
        try{
          const response = await fetch(`http://localhost:8080/api/v1/user/search?fullname=${fullname}`) 
            const data = await response.json()
         
          setSearchResults(data)
          console.log(response.data)
        }catch(error){
          console.log('Error fetching users: ', error)
        }
      }
    
    const handleClickUser = (userId, fullname) =>{
        console.log('Clicked user ID:', userId)
        setRecipientName(fullname)
        setRecipientUserId(userId)
        setChatOpen(true)
        socket.emit('create_room', {userId}, (room_id) =>{
            setRecipientRoomId(room_id)
        }) // emit a msg to the server to create a room
    }
    const handleSendMessages = async () =>{
        if(message.trim() !== ''){
            console.log('sending', message)
            socket.emit('private_message', {
                from_user: firstname,
                to_user: recipientName,
                room_id:recipientRoomId, 
                message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
                })
            setMessage('')
        }
    }

   
    
    useEffect(()=>{
        socket.connect();
        console.log('Component mounted')

    
        socket.on('connect', () =>{
            console.log(`socket connected with id: ${socket.id}`)
        })

       
        socket.on('private_message', (data)=>{
            console.log('private messaged received:', data)
            const receivedMessages = {from_user: data.from_user, message: data.message}

            if(!messages.find(msg => msg._id === data._id)){
                setMessages(prevMessages => [...prevMessages, data])
                const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
                const updatedMessages = [...storedMessages, receivedMessages]
                localStorage.setItem('chatMessages', JSON.stringify(updatedMessages))

            }
          
            
        })
        socket.on('room_created', (roomId) => {
            console.log('Room created with ID:', roomId);
            setRecipientRoomId(roomId); 
          });

        socket.on('disconnect', (   reason) => {
            console.log('Socket disconnected:', reason);
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        return () =>{
            socket.off("private_message")
        }

    }, [])

    
    useEffect(() =>{
        const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || []
        setMessages(storedMessages)
    }, [])




    console.log('private_message emitted:', {
        from_user:firstname,
        to_user: recipientName,
        room_id:recipientRoomId,
        message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    })
    return(
        
        
       
        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', py: 2 }}>

            <Box sx={{ backgroundColor: '#333', color: '#fff', display: 'flex' }}>
                <Link to="/User/LandingPage/SocialPage" style={{ position: "absolute", color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', top: 0, left: 0 }}>
                    <PeopleIcon />
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>Go Back</Typography>

                </Link>
                <Typography variant="subtitle1" sx={{ ml: 'auto', position: 'relative', color: 'blueviolet' }}>User: {firstname} {lastname}</Typography>

                <TextField
                    type="text"
                    placeholder="Search User"
                    variant="filled"
                    InputProps={{ style: { color: 'white' } }}
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    sx={{ ml: 'auto', mr: 2, width: '300px', flexGrow:1 }}
                />
                <Button onClick={fetchUsers} variant="contained">Search</Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, overflowY: 'auto', padding: '10px', color: 'cream' }}>
                <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: '10px', color: 'cream' }}>
                    <Typography variant="h6">Chat with {recipientName}</Typography>
                    <Typography>Messages:</Typography>
                    <Box sx={{ maxHeight: '70%', overflowY: 'auto', padding: '10px' }}>
                        {messages.map((msg, index) => (
                            <Typography key={index} style={{ marginBottom: '5px' }}>
                                <Typography style={{ fontWeight: 'bold', color: msg.from_user === firstname ? 'blue' : 'white' }}>
                                    {`${msg.from_user}: ${msg.message}`}
                                </Typography>

                            </Typography>
                        ))}
                    </Box>
                </Box>
                <Box sx={{ width: '300px', overflowY: 'auto', padding: '10px', color: 'cream' }}>
                    <Typography variant="h6">Search Results</Typography>
                    {Array.isArray(searchResults) && searchResults.map((user) => (
                        <Typography key={user._id} onClick={() => handleClickUser(user._id, `${user.firstname} ${user.lastname}`)} sx={{mb:1}}>
                            {`${user.firstname} ${user.lastname}`}
                        </Typography>
                    ))}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, mb: 2 }}>
                <TextField fullWidth 
                multiline 
                rows={4} 
                type="text" 
                InputProps={{ style: { color: 'white' } }} 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                sx={{ mr: 2 }} 
                variant='filled' 
                placeholder='send a message...' />
                <Button onClick={handleSendMessages} variant='contained'>Send a message</Button>
            </Box>
        </Container>

            
    )






}




export default Messages
