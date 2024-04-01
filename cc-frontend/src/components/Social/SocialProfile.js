import { Typography, Container } from '@mui/material';
import Box from '@mui/material/Box'
import * as React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';




function SocialProfile(){
    const location = useLocation();
    const { user } = location.state;
    return(
        <Container maxWidth="md" sx={{ height: '100vh', py: 2 }}>
             <Link to="/User/LandingPage/SocialPage/Students" style={{ position: "absolute", color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', top: 0, left: 0 }}>
                    <PeopleIcon />
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>Go Back</Typography>
                </Link>
        
            <Box sx={{ alignItems: 'center', textAlign:'center'}}>
                <Typography variant="h5">User Profile</Typography>
                <img className="profile-img" src='https://placehold.co/150x150' alt="fav icon" />

                <Typography variant='subtitle1'>First name: {user.firstname}</Typography>
                <Typography variant='subtitle1'>Last name: {user.lastname}</Typography>
                <Typography variant='subtitle1'>Gender: {user.gender}</Typography>
                <Typography variant='subtitle1'>{user.accountType}</Typography>
                <Typography variant='subtitle1'>{user.description}</Typography>




            </Box>
        </Container>
    )
}


export default SocialProfile