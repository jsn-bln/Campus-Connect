import React, {useState, useEffect} from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider} from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Posting(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    const {firstname, lastname, studentId }  = userData;
  
  
    const [lastName, setLastName] = useState('')

    const [firstName, setFirstName] = useState('')

    
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

          

            
            console.log('Retrieved firstName:', {firstname});
            console.log('Retrieved lastName:', {lastname});

            if(!firstname || !lastname || !studentId){
                console.error("User's first and last name not found in local storage")
                return;
            }
            const response = await axios.post('http://localhost:8080/api/v1/post/postComment', {
                firstname:firstname,
                lastname:lastname,
                studentId:studentId,
                content: ` ${content}`
    
            
            })  
            console.log(response.data)
            handleClose()

 
        }catch(error){
            console.error('Error creating post: ', error)
        }
    }


    const handleChangeContent = (e) =>{
        setContent(e.target.value)
    }


    const handleChangeLastName = (e)=>{
        setLastName(e.target.value)
    }

    const handleChangeFirstName = (e)=>{
        setFirstName(e.target.value)
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
                  label="Student ID     "
                  name="post"
                  autoComplete="post"
                  value={studentId}
                //   onChange={handleChangeStudentId}
                  inputProps={{ style: { color: 'black' } }}
                  InputLabelProps={{
                    style: { color: 'black' } 
                  }}
            />  
            <Divider sx={{ my: 1 }} />

            <TextField
                  fullWidth
                  label="First name"
                  name="post"
                  autoComplete="post"
                  value={firstName}
                  onChange={handleChangeFirstName}
                  inputProps={{ style: { color: 'black' } }}
                  InputLabelProps={{
                    style: { color: 'black' } 
                  }}
            />
                            <Divider sx={{ my: 1 }} />

               <TextField
                  fullWidth
                  label="Last name"
                  name="post"
                  autoComplete="post"
                  value={lastName}
                  onChange={handleChangeLastName}
                  inputProps={{ style: { color: 'black' } }}
                  InputLabelProps={{
                    style: { color: 'black' } 
                  }}
            />
                <Divider sx={{ my: 1 }} />

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

