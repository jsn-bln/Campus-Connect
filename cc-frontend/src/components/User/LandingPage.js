import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link} from "react-router-dom"

import { createTheme, ThemeProvider } from '@mui/material/styles';
import SvgIcon  from '@mui/material/SvgIcon';
import img1 from '../ImagesFrontend/socialHub.jpg'
import TextField from '@mui/material/TextField'

 

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }


const cards = [
    { id: 1, content: 'Social Hub', imageUrl: img1 },
    { id: 2, content: 'Routine', imageUrl: 'https://source.unsplash.com/random?wallpapers&2' },
    { id: 3, content: 'Marketplace', imageUrl: 'https://source.unsplash.com/random?wallpapers&3' },
    { id: 4, content: 'Navigator', imageUrl: 'https://source.unsplash.com/random?wallpapers&4' },
  ];


const defaultTheme = createTheme();

export default function LandingPage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
            

          <HomeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Campus Connect
          </Typography>
          <TextField label="Search" variant="standard"  style={{marginLeft:'auto', marginRight:100}}>

          </TextField>
          <Button variant="h6" sx={{marginLeft:'auto'}}>
            Log Out
          </Button>
        </Toolbar>
       
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Discover Campus Connect
            </Typography>
           
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
                <Link to="ProfilePage">
                <Button variant="contained">View Profile</Button>
                </Link>
              <Button variant="outlined">Filler Button</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={6}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={card.imageUrl}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {card.content}

                    </Typography>
                    
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
     
    </ThemeProvider>
  );
}