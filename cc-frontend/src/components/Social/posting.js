import React, {useState} from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from '@mui/material'
import axios from 'axios'

function Posting(){
    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState('')
    const togglePopUp = () => {
        setIsOpen(!isOpen)
    }
    const handleClose = () =>{
        setIsOpen(false)
    }

    const handleCreatePost = async () =>{
        try{
            const response = await axios.post('http://localhost:8080/api/v1/post/postComment', {content})
            console.log(response.data)
            handleClose()


        }catch(error){
            console.error('Error creating post: ', error)
        }
    }

    const handleChangeContent = (e) =>{
        setContent(e.target.value)
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
                  value={content}
                  onChange={handleChangeContent}
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