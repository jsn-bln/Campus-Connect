import React from 'react';
import { Paper, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'


function ChatUI({onClose}){
    return(
        <Box sx={{position:'fixed', bottom:0, right:0, zIndex:999}}>
            <Paper>
                <Box p={2}>
                    <Typography  variant='h6'>
                        Messages
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


export default ChatUI