import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import './marketplace.css';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useItemId } from '../Context/context';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
import Details from './details';
import { mainListItems, marketPlaceItems, routineItems, socialListItems, navigationItems } from '../User/listItems'; 
import { Button, ListItemText, ListItem, ListItemIcon } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Message from '../Social/Messages';
import Groups from '../Social/Groups';







export default function Marketplace(props) {
  const { window } = props;
  const navigate = useNavigate();


  // drawer
  const drawerWidth = 240;
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };



  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState(null);
  const { setItemId } = useItemId();

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

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));




  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // const drawer = (
  //   <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
  //     <Typography variant="h6" sx={{ my: 2 }}>
  //       Campus Marketplace
  //     </Typography>
  //     <Divider />
  //     <List>
  //       <Button>Home</Button>
  //       <Button>{firstname}</Button>
  //     </List>
  //   </Box>
  // );

  const container = window !== undefined ? () => window().document.body : undefined;

  function handleClick(id) {
    navigate(`/details/${id}`);

  }




  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ paddingTop: 0, backgroundColor: red }} position="absolute" open={open}>
        <Toolbar sx={{
                pr: '24px', // keep right padding when drawer closed
              }}>
          
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...({ display: 'flex' }),
            }}
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
                noWrap
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }}}
              > 
              
                Campus Marketplace
              </Typography>
            </div>
            <div className='main-container'>
              <Button variant='text' className='cat-link'>Electronics</Button>
              <Button className='cat-link' >Books</Button>
              <Button className='cat-link' >Sporting goods</Button>
              <Button className='cat-link' >Clothing</Button>
              <Button className='cat-link' >Others</Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      

      <Drawer variant="permanent"  open={open} >
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
                <Box>
                <List component="nav">
                    
                {socialListItems.map((item, index) => (
                <Link key={index} to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </Link>

              ))}
                <Divider sx={{ my: 1 }} />
                {marketPlaceItems.map((item, index) => (
                <Link key={index} to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </Link>

              ))}
                <Divider sx={{ my: 1 }} />
                {routineItems.map((item, index) => (
                <Link key={index} to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </Link>

              ))}
               <Divider sx={{ my: 1 }} />
                {navigationItems.map((item,index)=>(
                  <Link key={index} to={item.path} style={{textDecoration: 'none', color:'inherit'}}>
                    <ListItem>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text}/>
                    </ListItem>

                  </Link>
                ))}

                

                </List>
                </Box>
          </Drawer>
          
      {/* <nav>
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
      </nav> */}
       {/* className='box-container' originally inside <Box> below  */}
      <Box  component="main" sx={{
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}>
        <Toolbar />
        <div className='item-container'>
          {items.map(item => (
            <Card sx={{ maxWidth: 250, margin: 1.2 }}>
              <CardMedia
                  component="img"
                  alt={item.itemName}
                  height="150"
                  image="https://placehold.co/100x100"
                />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.itemName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.itemDescription}
                </Typography>
              </CardContent>
              <CardActions>
              <Button size="small" 
                      onClick={
                        () => {
                          setItemId(item._id);
                          navigate('/User/LandingPage/Marketplace/Details')
                        }
                      }>Details</Button>
             

              </CardActions>
            </Card>
          
          ))}
       </div>


      </Box>
    </Box>
  );
}