import { Link } from "react-router-dom";
import * as React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import io from 'socket.io-client'
import axios from  'axios'
import { Paper, Box, Typography, Button, IconButton, TextField, Divider, Grid, Container } from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
function Students(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    const { _id ,email, firstname, lastname, studentId }  = userData;

    const [searchResults, setSearchResults] = useState([])
    const [fullname, setFullName] = useState('')

    const navigate = useNavigate();


    
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

      useEffect(() =>{
        fetchUsers();
      })
    
    return(
        
        
       
        <Container maxWidth="md" sx={{  py: 2 }}>
            <Typography variant="subtitle1" sx={{ ml: 'auto', position: 'relative', color: 'blueviolet' }}>User: {firstname} {lastname}</Typography>

            <Box sx={{ backgroundColor: '#333', color: 'blue', display: 'flex' }}>
                <Link to="/User/LandingPage/SocialPage" style={{ position: "absolute", color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', top: 0, left: 0 }}>
                    <PeopleIcon />
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>Go Back</Typography>
                </Link>
                <TextField 
                inputProps={{style:{color:'white'}}}
                variant="outlined" 
                sx={{flexGrow:1, width: '25ch'}}  
                value={fullname}
                  
                onChange={(e) => setFullName(e.target.value)}>Enter in name</TextField>
                <Button onClick={fetchUsers} variant="contained">Search</Button>
            </Box>
            <Box sx={{ width: '300px', overflowY: 'auto', padding: '10px', color: 'cream' }}>
                    <Typography variant="h6">Search Results</Typography>
                    {Array.isArray(searchResults) && searchResults.map((user, index) => (
                        <React.Fragment key={user._id}>
                            <Typography onClick={() => (user._id, `${user.firstname} ${user.lastname}`)} sx={{ mb: 1 }}>
                                {`${user.firstname} ${user.lastname}`}
                            </Typography>
                            <IconButton aria-label="view" onClick={() => navigate(`/User/LandingPage/SocialPage/Students/SocialProfile/${user.firstname}`, {state: {user}})}>
                                <AccountBoxIcon/>
                            </IconButton>
                            {index !== searchResults.length - 1 && <Divider sx={{ my: 1 }} />}
                         </React.Fragment>
                    ))}
                </Box>

    
        </Container>

            
    )
}

export default Students