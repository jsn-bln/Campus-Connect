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



const drawerWidth = 240;




export default function DrawerAppBar(props) {
  const { window } = props;
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState(null);


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
      axios.get('http://localhost:8080/api/v1/marketplace/items')
        .then(response => {
          const firstTenItems = response.data.slice(0, 10);
          setItems(firstTenItems);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
  
    fetchData();

  }, []);
  



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
      <AppBar component="nav">
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
            <div className='nav-title'>
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
      <Box className='box-container' component="main" sx={{ p: 3 }}>
        <Toolbar />
        <div className='item-container'>
          {items.map(item => (
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={item.itemName}
                height="140"
                image={item.itemImage}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.itemName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.ItemDescription}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          
          ))}
       </div>


      </Box>
    </Box>
  );
}