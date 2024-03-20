import React, {useEffect, useState} from 'react';
import { Paper, Box, Typography, Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import io from 'socket.io-client';
import MessageBox from './Messages'

// const URL = "http://localhost:8080"
// const socket = io(URL,{autoConnect:true, transports: ['websocket']});
function ChatUI({onClose}){

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [fullname, setFullName] = useState('')
    const [query, setQuery] = useState('')
    const [recipientUserId, setRecipientUserId] = useState('')
    const [recipientName, setRecipientName] = useState('')

    const [chatOpen, setChatOpen] = useState(false)
    const userData = JSON.parse(localStorage.getItem('userData'));
    const { _id ,email, firstname, lastname, studentId }  = userData;

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
    
    
    

    // useEffect(()=>{
    //     socket.on('private_message', (data)=>{
    //         setMessages((prevMessages) => [... prevMessages, data]);
    //     })

    //     return ()=>{
    //         socket.disconnect();
    //     }
    // },[]);


    const handleClickUser = (userId, fullname) =>{
        console.log('Clicked user ID:', userId)
        setRecipientName(fullname)
        setRecipientUserId(userId)
        setChatOpen(true)
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
                    value={fullname} onChange={(e) => setFullName(e.target.value)} />
                    <Button onClick={fetchUsers}>Search</Button>
                    {Array.isArray(searchResults) && searchResults.map((user) => (
                        <Typography key={user._id} onClick={() => handleClickUser(user._id, `${user.firstname} ${user.lastname}`)}>
                        {`${user.firstname} ${user.lastname}`}
                    </Typography>    
                    ))}

                    </Box>
                
                        
                
                </Box>
                <Box textAlign="right" pr="30vw"  pb="30vh">
                    <IconButton onClick={onClose}  sx={{position:'absolute', top:0, right:0    }}>
                    <CloseIcon fontSize='small'/>


                    </IconButton>
              
                </Box>
                <Box p={2}>
                    {chatOpen && (
                        <MessageBox recipientUserId={recipientUserId} recipientName={recipientName} onClose={() => setChatOpen(false)}/>
                    )}
             
                    
                </Box>
             
            </Paper>
        </Box>

    )
}


export default ChatUI