import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MessageIcon from '@mui/icons-material/Message';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StoreIcon from '@mui/icons-material/Store';

import MapIcon from '@mui/icons-material/Map';
export const socialListItems = [
  {
    text: 'Social',
    path: '/User/LandingPage/SocialPage',
    icon: <DashboardIcon />,
  },
  {
    text: 'Message',
    path: '/Messages',
    icon: <MessageIcon />,
  },
  {
    text: 'Friends',
    path: '/Friends',
    icon: <PeopleIcon />,
  },
  // <React.Fragment>
    // <ListItemButton>
    //   <ListItemIcon>
    //     <DashboardIcon />
    //   </ListItemIcon>
    //   <ListItemText primary="Social" />
    // </ListItemButton>
    // <ListItemButton>
    //   <ListItemIcon>
    //     <MessageIcon />
    //   </ListItemIcon>
    //   <ListItemText primary="Friends" />
    // </ListItemButton>
    // <ListItemButton>
    //   <ListItemIcon>
    //     <PeopleIcon />
    //   </ListItemIcon>
    //   <ListItemText primary="Notifications" />
    // </ListItemButton>
   
  // </React.Fragment>
];

export const marketPlaceItems = [
  {
    text: 'MarketPlace',
    path: '/User/LandingPage/Marketplace',
    icon: <StoreIcon />,
  },
  
];


export const routineItems = [
  {
    text: 'Routine',
    path: '/User/LandingPage/RoutinePage',
    icon: <EventNoteIcon />,
  },
  
];



export const navigationItems = [
  {
    text: 'Navigation',
    path: '/User/LandingPage/NavigationPage',
    icon: <MapIcon />,
  },
  
];





