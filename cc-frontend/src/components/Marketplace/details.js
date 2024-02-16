import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './marketplace.css';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { useItemId } from '../Context/context';


const drawerWidth = 240;
export default function Details(props) {
  const { window } = props;
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [item, setItem] = useState([]);
  const [userData, setUserData] = useState(null);
  const { itemId } = useItemId();



  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
      navigate("/");
    } else {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = () => {
  
      axios.post('http://localhost:8080/api/v1/marketplace/search/id', { id: itemId })
        .then(response => {
          const item = response.data;
          setItem(item); 
          console.log("use effect");
          console.log(item);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
  
    fetchData();
  }, []);


  if (item === null) {
    return <div>Loading...</div>;
  }


  if (userData === null) {
    return <div>Loading...</div>;
  }



  
  const { email, firstname, lastname, studentId } = userData || {};


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Campus Marketplace
      </Typography>
      <Divider />
      <List>
        <Button>Home</Button>
        <Button>{firstname}</Button>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ paddingTop: 0, backgroundColor: red }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <div className='nav-wrapper'>
            <div className='nav-title' style={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/User/landingpage" style={{textDecoration: "none", color: "#ffffff"}}>
                <HomeIcon sx={{ mr: 2 }}/>
              </Link>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              > 
              
                Campus Marketplace
              </Typography>
            </div>
            <div className='main-container'>
              <Button variant='text' className='cat-link'>Electonics</Button>
              <Button className='cat-link' >Books</Button>
              <Button className='cat-link' >Sporting goods</Button>
              <Button className='cat-link' >Clothing</Button>
              <Button className='cat-link' >Others</Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box className='' component="main">
        <Toolbar />
        <div className='detail-container'>
          <div className='left-desc'>
                <h2>{item.itemName}</h2>
                <div>
                    <span>Item Description</span>
                    <p>{item.itemDescription}</p>
                    <span>Item Price</span>
                    <p>${item.itemPrice}</p>
                    <span>Item Condition</span>
                    <p>${item.itemCondition}</p>
                </div>

          </div>
          <img src='https://placehold.co/400x400'/>
         
       </div>
       <Link to="/user/LandingPage/marketplace">
            <Button variant='contained'>Go Back</Button>
          </Link>


      </Box>
    </Box>
  );
}