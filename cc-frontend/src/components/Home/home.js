import { styled, Button, Typography } from "@mui/material"
import { blue } from "@mui/material/colors";
import img1 from '../ImagesFrontend/ccPic.jpg';
import React from 'react'
import {Link} from "react-router-dom"
const StyledButton = styled('button')({
    backgroundColor:'blue',
    color:'white',
    padding:'10px',
    borderRadius:'8px',
    cursor:'pointer',
    border:'none',
    position:'absolute'
   
});

function Home(){
    return(
        <div style={{textAlign:'left'}}>
            <div>
            <h3 style={{color:'white',  position:'absolute', top:'25%', left:"10%"}}>Discover and <br/> join</h3>
            <p style={{ position:'absolute', top:'40%', left:"10%"}}>Connect with students on your campus</p>
            <h3 style={{color:'white', position:'absolute', top:0, left:"10%"}}>Campus Connect</h3>

            <div style={{position:'absolute', top:'5%'}}>

            
            <img src={img1} alt="fav icon" 
            style={{ height: '30%', width: '80%', top: '30%', right: '30%', borderRadius:'15%' }}/>


            </div>
            <Link to="/SignIn">
            <Button style={{position:'absolute', top:'50%', left: "10%"}}variant="contained">Log in</Button>

            </Link>

            <Link to="/Register">
            <Button style={{position:'absolute',top:"55%",left:"10%"}}variant="contained">Join now</Button>
            </Link>
            </div>
           
        


            

        </div>
        
        
     

    )
}
export default Home



