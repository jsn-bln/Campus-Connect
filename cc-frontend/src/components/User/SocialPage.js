import * as React from 'react';
import { useState, useEffect } from 'react';
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
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, marketPlaceItems, navigationItems, routineItems, socialListItems } from './listItems';
import Message from '../Social/Messages';
import Groups from '../Social/Groups';
import ChatUI from '../Social/ChatUI';
import Notifications, {MessagePopOut, NotificationPopOut} from '../Social/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import { Home } from '@mui/icons-material';
import { Button, ListItemText, ListItem, ListItemIcon, Icon } from '@mui/material';
import {Link, useNavigate} from "react-router-dom"
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField'
import Posting from '../Social/posting';
import axios from 'axios';


const drawerWidth = 200;
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
// side bar
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'fixed',
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

const items = [
  { id: 1, content: 'Front Page', path: "/User/LandingPage/SocialPage"},
  { id: 2, content: 'Friends',  path: "/User/LandingPage/SocialPage/Friends" },
  { id: 3, content: 'Group', path: "/User/LandingPage/SocialPage/Groups" },
  { id: 4, content: 'Messages', path: "/User/LandingPage/SocialPage/Messages" },
];

function SocialPage(){
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const { email, firstname, lastname, studentId }  = userData;

  const [posts, setPosts] = useState([])



  const fetchPosts = async () =>{
    try{
      const response = await axios.get('http://localhost:8080/api/v1/post/posts');
      setPosts(response.data)
    }catch(error){
      console.log('Error fetching posts: ', error)
    }
  }
  useEffect(()=>{
    fetchPosts();
  }, [])

  const handleDeletePost = async (postId, studentId) =>{
    try{
        await axios.delete(`http://localhost:8080/api/v1/post/${postId}`,{
          data:{ studentId }
        })
        
        const updatedPosts = posts.filter(post => post._id !== postId)

        setPosts(updatedPosts)
        console.log(`post with id ${postId} deleted successfully`)

    }catch(error){
        console.error("An error has occurred:", error)
    }

}


  //side bar
  const [open, setOpen] = React.useState(true);

  // chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  // chat
  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen)
    setNotificationsOpen(false)
  }

  // notifications
  const handleNotificationsToggle = () => {
    setNotificationsOpen(!isNotificationsOpen)
    setIsChatOpen(false)
  }

  const handleNotificationsClick = (path) => {
    if(path === "/User/LandingPage/SocialPage/Messages"){
      setIsChatOpen(true)
    }
   
  }
 

  // Side bar
  const toggleDrawer = () => {
    setOpen(!open);
    
  };

    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', alignItems:'center' }}>
          
          <AppBar position="absolute"  open={open} style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            
            <Toolbar
            
            
            
              sx={{
                pr: '24px' // keep right padding when drawer closed
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
              <div className='main-container'>
                {items.map((items) => (

                  <Button key={items.id}className='cat-link' onClick={() => handleNotificationsClick(items.path)}>{items.content}</Button>
                
                  ))} 
        
            </div>
              <TextField label="Search" variant="filled" sx={{margin:'auto'}} />

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
                {/* Items on the sides */}
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

          <IconButton onClick={handleNotificationsToggle}>

          <NotificationPopOut/>
          


          </IconButton>
          {isChatOpen && <ChatUI onClose={handleChatToggle} />}
          {isNotificationsOpen && <Notifications onClose={handleNotificationsToggle} />}


          {/* below is for cards */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              minHeight:'calc(100vh - 64px)', // subtracting the height of the appbar
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}


          >
          <Container sx={{ py: 8, mt: 4, mb: 4  }} maxWidth="lg">
            <Box sx={{marginBottom: 2}}>
              
              <Posting/>
            </Box>
          {/* End hero unit */}

            {posts.map((post) => (
              <Container key={post._id} maxWidth="md" sx={{marginBottom:2}}>
                <Card>

                  <CardContent sx={{ flexGrow: 1,  py: 4, mt: 4, mb: 4, mx:8  }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.firstname} 

                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.lastname}

                    </Typography>
                    
                   
                
                    <Typography gutterBottom variant="body1" component="p">
                        {post.content}

                    </Typography>
                    
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => navigate(post.path)}>View</Button>
                    <Button size='small' onClick={() => handleDeletePost(post._id, studentId)}>Delete</Button>
                  </CardActions>
                </Card>
              </Container>
            ))}
            


        </Container>
            
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

export default SocialPage