import { styled, Button, Typography } from "@mui/material"
import { blue } from "@mui/material/colors";
import img1 from '../ImagesFrontend/ccPic.jpg';
import React from 'react'
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./home.css"


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

    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
          navigate("/User/landingpage");
        }
      }, [navigate]);


    return(
        <div className="home-container">
            <div className="left-eml">
                <h1>Campus Connect</h1>
                <div>
                    <h3>Discover and join</h3>
                    <p>Connect with students on your campus</p>
                </div>
                

                <div className="home-btngrp">
                    <Link className="act-btn" to="/SignIn">
                        <Button variant="contained">Log in</Button>
                    </Link>

                    <Link className="act-btn" to="/Register">
                        <Button variant="contained">Join now</Button>
                    </Link>
                
                 </div>

            


            </div>
            <img className="hero-img" src={img1} alt="fav icon" />

            

        </div>
        
    )
}
export default Home



