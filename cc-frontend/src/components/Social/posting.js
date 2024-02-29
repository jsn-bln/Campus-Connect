import React, {useState} from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from '@mui/material'

function Posting(){
    const [isOpen, setIsOpen] = useState(false)
    const togglePopUp = () => {
        setIsOpen(!isOpen)
    }
    const handleClose = () =>{
        setIsOpen(false)
    }

    const handleCreatePost = () =>{
        handleClose()
    }
    return(
        <>
        <Button variant='contained' color='primary' onClick={togglePopUp}>
            Create Post
        </Button>
        <Dialog open={isOpen} onClose={handleClose}>

        <DialogTitle>
            Create a new post
            <DialogContent>

                <TextField
                  fullWidth
                  label="Add content..."
                  name="post"
                  autoComplete="post"
                  inputProps={{ style: { color: 'black' } }}
                  InputLabelProps={{
                    style: { color: 'black' } 
                  }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCreatePost}>Create</Button>
                <Button onClick={handleClose}>Cancel</Button>

            </DialogActions>
        </DialogTitle>
        </Dialog>
        
        </>

    )
}


export default Posting