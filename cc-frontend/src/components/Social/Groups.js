import { Link } from "react-router-dom";
import * as React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import io from 'socket.io-client'
import axios from  'axios'
import { Paper, Box, Typography, Button, IconButton, TextField, Divider, Grid, Container } from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
function Groups(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    const { _id ,email, firstname, lastname, studentId }  = userData;

    const [searchResults, setSearchResults] = useState([])
    const [group, setGroup] = useState('')
    const [fullname, setFullName] = useState('')
    const [groupName, setGroupName] = useState('')


    const navigate = useNavigate();


    const createGroup = async () =>{
      try{
        const response = await axios.post('http://localhost:8080/api/v1/group/create', {
          groupName: groupName
        })
        console.log(response.data);
      }catch(error){
        console.log('error creating group', error)
      }
    }


    
    const fetchGroups = async () =>{
        try{
          const response = await axios.get('http://localhost:8080/api/v1/group/getGroups') 
         
          setSearchResults(response.data)
          console.log(response.data)
        }catch(error){
          console.log('Error fetching groups: ', error)
        }
      }

      useEffect(() =>{
        fetchGroups();
      }, [])
    
    return(
        
        
       
        <Container maxWidth="md" sx={{ height: '100vh', py: 2 }}>
            <Typography variant="subtitle1" sx={{ ml: 'auto', position: 'relative', color: 'blueviolet' }}>Find a group!</Typography>

            <Box sx={{ backgroundColor: '#333', color: 'blue', display: 'flex' }}>
                <Link to="/User/LandingPage/SocialPage" style={{ position: "absolute", color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', top: 0, left: 0 }}>
                    <PeopleIcon />
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>Go Back</Typography>
                </Link>
                <TextField 
                inputProps={{style:{color:'white'}}}
                variant="outlined" 
                sx={{flexGrow:1, width: '25ch'}}  
                value={group}
                  
                onChange={(e) => setGroup(e.target.value)}>Enter in name</TextField>
                <Button onClick={fetchGroups} variant="contained">Search</Button>
            </Box>
            <Box sx={{ width: '300px', overflowY: 'auto', padding: '10px', color: 'cream' }}>
            <Box>
                  <form onSubmit={createGroup}>
                    <TextField 
                    label="Name for group" 
                    variant="outlined" 
                    value={groupName}
                    InputProps={{style:{color:"white"}}} 
                    onChange={(e)=> setGroupName(e.target.value)}>

                    </TextField>
                    <Button type="submit" variant="contained">Create Group</Button>

                  </form>
                </Box>
                    <Typography variant="h6">Search Results</Typography>
                    {Array.isArray(searchResults) && searchResults.map((group, index) => (
                        <React.Fragment key={group._id}>
                            <Typography onClick={() => (group._id, `${group.groupName} ${group.users}`)} sx={{ mb: 1 }}>
                                {`${group.groupName} ${group.users}`}
                            </Typography>  
                         </React.Fragment>
                    ))}
                </Box>
               

    
        </Container>

            
    )
}

export default Groups