import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React, {useState, useEffect} from 'react';
import { Paper, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'


export default function Notifications({onClose}){
    return(
        <Box sx={{position:'fixed', bottom:0, right:0, zIndex:999}}>
            <Paper>
                <Box p={2}>
                    <Typography  variant='h6'>
                        Notifications
                    </Typography>
                
                </Box>
                <Box textAlign="right" pr="30vw"  pb="30vh">
                    <IconButton onClick={onClose}  sx={{position:'absolute', top:0, right:0    }}>
                    <CloseIcon fontSize='small'/>


                    </IconButton>
                </Box>




            </Paper>
        </Box>

    )
}


export function NotificationPopOut(){


  const [open, setOpen] = useState(true)
  const handleClose = () => {
   

    setOpen(false)
  }



  return(
    <>{(
    <Snackbar
    open = {open}
    anchorOrigin={{vertical:'top',horizontal:'left'}}
    style={{top:'10%', left:'10%'}}
    action={
      <IconButton size='small' aria-label='close' color='inherit'>
        <CloseIcon fontSize='small' />
      </IconButton>
    }
 
    >
      
      <MuiAlert
       elevation={6}
       variant='filled'
       severity='info'
       action={
        <IconButton size='small' aria-label='close' color='inherit'  onClick={handleClose}>
          <CloseIcon fontSize='small'/>
        </IconButton>
       }
      >
        Notifications
      </MuiAlert>



     </Snackbar>
    )}
    </>
  )
}


