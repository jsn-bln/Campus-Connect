import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, marketPlaceItems, navigationItems, routineItems, socialListItems } from './listItems';
import Message from '../Social/Messages';
import Groups from '../Social/Groups';
import HomeIcon from '@mui/icons-material/Home';
import { Home } from '@mui/icons-material';
import { Button, ListItemText, ListItem, ListItemIcon } from '@mui/material';
import {Link, useNavigate} from "react-router-dom"
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';




const drawerWidth = 240;
// Top bar
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
const defaultTheme = createTheme();

const cards = [
  { id: 1, content: 'Messages', imageUrl: 'url(https://source.unsplash.com/random?wallpapers)' , path: "/User/LandingPage/SocialPage/Messages"},
  { id: 2, content: 'Friends', imageUrl: 'url(https://source.unsplash.com/random?wallpapers)', path: "/User/LandingPage/SocialPage/Friends" },
  { id: 3, content: 'Group', imageUrl: 'url(https://source.unsplash.com/random?wallpapers)', path: "/User/LandingPage/SocialPage/Groups" },
  { id: 4, content: 'Search', imageUrl: 'url(https://source.unsplash.com/random?wallpapers)', path: "/User/LandingPage/SocialPage/Notifications" },
];


function SocialPage(){
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
    
  };
  const navigate = useNavigate();

   
    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <AppBar position="absolute"  open={open} >
            
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
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
              <Link to="/User/LandingPage" style={{color:'white'}}>
              <HomeIcon sx={{ mr: 2 }} />
              </Link>
              <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>

                Campus Social
              </Typography>
              <IconButton color="inherit">
                {/* <Link to="/User/LandingPage" style={{color:'white'}}>
                    <Button variant='text' style={{color:'white'}}>Go Home</Button>
                    <HomeIcon />
                </Link> */}
                
              </IconButton>
            </Toolbar>
          </AppBar>
              {/* bar on the left side */}
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
          {/* below is for cards */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <p style={{display:'center'}}>Social Hub</p>
         
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={6}>
                
                                    <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {card.content}

                    </Typography>
                    
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => navigate(card.path)}>View</Button>
                  </CardActions>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* --------------------- */}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
               
                
                
                
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

export default SocialPage