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
import { mainListItems, socialListItems } from './listItems';
import Message from './Messages';
import Groups from './Groups';
import HomeIcon from '@mui/icons-material/Home';
import { Home } from '@mui/icons-material';
import { Button } from '@mui/material';
import {Link} from "react-router-dom"



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

function SocialPage(){
   
    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <AppBar position="absolute" >
            
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{
                  marginRight: '36px',
                  ...({ display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/User/LandingPage" style={{color:'white'}}>
              <HomeIcon sx={{ mr: 2 }} />
              </Link>
              <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>

                Campus Connect
              </Typography>
              <IconButton color="inherit">
                {/* <Link to="/User/LandingPage" style={{color:'white'}}>
                    <Button variant='text' style={{color:'white'}}>Go Home</Button>
                    <HomeIcon />
                </Link> */}
                
              </IconButton>
            </Toolbar>
          </AppBar>
      
          <Drawer variant="permanent" >
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
                <Box>
                <List component="nav">
                    
                {socialListItems}
                </List>
                </Box>
          </Drawer>
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
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <p>Social Hub</p>
              <Grid container spacing={3}>
                {/* User Statistics */}
                <Grid item xs={12} md={6} lg={3}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    {/* User statistics component */}
                    <Typography variant="h6" gutterBottom>
                      Friends
                    </Typography>
                    {/* Place your user statistics here */}
                  </Paper>
                </Grid>
                {/* Recent Activities */}
                <Grid item xs={12} md={6} lg={3}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    {/* Recent activities component */}
                    <Typography variant="h6" gutterBottom>
                      Recent Activities
                    </Typography>
                    {/* Place your recent activities here */}
                  </Paper>
                </Grid>
                {/* Notifications */}
                <Grid item xs={12} md={6} lg={3}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    {/* Notifications component */}
                    <Typography variant="h6" gutterBottom>
                      Notifications
                    </Typography>
                    {/* Place your notifications here */}
                  </Paper>
                </Grid>
                {/* Messages */}
                <Grid item xs={12} md={6} lg={3}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    {/* Messages component */}
                    <Typography variant="h6" gutterBottom>
                      Messages
                    </Typography>
                    <Message />
                  </Paper>
                </Grid>
                {/* Groups */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    {/* Groups component */}
                    <Typography variant="h6" gutterBottom>
                      Groups
                    </Typography>
                    <Groups />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

export default SocialPage