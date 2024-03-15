import React, {useEffect, useState} from 'react';
import { Paper, Box, Typography, Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import io from 'socket.io-client';


const socket = io('http://localhost:8080')

function ChatUI({onClose}){
    

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [query, setQuery] = useState('')

    const fetchUsers = async () =>{
        try{
          const response = await fetch(`http://localhost:8080/api/v1/user/search?firstname=${firstname}&lastname=${lastname}`) 
            const data = await response.json()
         
          setSearchResults(data)
          console.log(response.data)
        }catch(error){
          console.log('Error fetching users: ', error)
        }
      }
    
    
    

    useEffect(()=>{
        socket.on('private_message', (data)=>{
            setMessages((prevMessages) => [... prevMessages, data]);
        })

        return ()=>{
            socket.disconnect();
        }
    },[]);

    const handleSendMessages = () => {
        if(message.trim() !== ''){
            socket.emit('private_message', {toUserId: 'recipientUserId', message});
            setMessage('');
        }
    }

    return(
        <Box sx={{position:'fixed', bottom:0, right:0, zIndex:999}}>
            <Paper>
                <Box p={2}>
                    <Typography  variant='h6'>
                        Messages
                    </Typography>
                    <Box>
                    <TextField type='text 'placeholder="Search User" variant="filled" sx={{margin:'auto'}} 
                    value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                    <Button onClick={fetchUsers}>Search</Button>
                    {Array.isArray(searchResults) && searchResults.map((user) => (
                        <p key={user._id}>{`${user.firstname}`} {`${user.lastname}`}</p>
                    ))}

                    </Box>
                
                  
                
                </Box>
                <Box textAlign="right" pr="30vw"  pb="30vh">
                    <IconButton onClick={onClose}  sx={{position:'absolute', top:0, right:0    }}>
                    <CloseIcon fontSize='small'/>


                    </IconButton>
              
                </Box>
                <Box p={2}>
                {messages.map((msg, index) => (
                    <div key={index}>{`${msg.from_user}: ${msg.message}`}</div>
                ))}
                    
                </Box>
                <Box p={2}>
                    <input type='text' value={message} onChange={(e)=> setMessage(e.target.value)}/>
                    <Button onClick={handleSendMessages}>Send Message</Button>
                </Box>
                





            </Paper>
        </Box>

    )
}


export default ChatUI