import * as React from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client'
import Box from '@mui/material/Box'
import { Typography, Button } from '@mui/material';
import axios from  'axios'

const URL = "http://localhost:8080"
const socket = io(URL,{autoConnect:false, transports: ['websocket']});

function Messages({recipientUserId, recipientName}){
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [messageReceived, setMessageReceived] = useState('')
    const userData = JSON.parse(localStorage.getItem('userData'));
    const { _id ,email, firstname, lastname, studentId }  = userData;
    

    useEffect(()=>{
        socket.connect();

     


        socket.on('connect', () =>{
            console.log('socket connected')
        })
        socket.on('private_message', (data)=>{
            console.log('private messaged received:', data)
            const messageReceived = {from_user: data.from_user, message: data.message}
            const storedMessages = JSON.parse(localStorage.getItem('chatMessaages')) || [];
            const updatedMessages = [...storedMessages, messageReceived]
            localStorage.setItem('chatMessages', JSON.stringify(updatedMessages))
            
            setMessages(prevMessages => [...prevMessages, data])

            
        })

        socket.on('disconnect', (   reason) => {
            console.log('Socket disconnected:', reason);
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        return () =>{
            socket.disconnect()
        }

    


    }, [socket])

    useEffect(() =>{
        const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || []
        setMessages(storedMessages)
    })


    

    const handleSendMessages = async () =>{
        if(message.trim() !== ''){
            console.log('sending', message)
            socket.emit('private_message', {
                from_user: firstname,
                to_user: recipientName, 
                message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
                })
            setMessage('')
        }
    }

    console.log(message)
    return(
        <Box>
            <Typography>Chat with {recipientName}</Typography>
            <input type='text' value={message} onChange={(e) => {setMessage(e.target.value)}} />
            <Button onClick={handleSendMessages}>Send a message</Button>
            <Typography>Message:</Typography>
            <Box>
                {messages.map((msg, index) => (
                    <Typography key={index}>{`${msg.from_user}: ${msg.message}`}</Typography>
                ))}
            </Box>

        </Box>
    )






}




export default Messages
