import './ProfilePage.css'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider} from '@mui/material';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function ProfilePage(){

    const userData = JSON.parse(localStorage.getItem('userData'));
    const { _id,email, firstname, lastname, studentId, description }  = userData;
    const navigate = useNavigate();
    const [content, setContent] = useState(description || '')

    const [isOpen, setIsOpen] = useState(false)


     
    const handleClose = () =>{
        setIsOpen(false)
    }

 
    const handleSaveDescription = async () => {
        try {
            console.log('Request data:', { userId: studentId, description: content }); 

            const response = await axios.post('http://localhost:8080/api/v1/user/description', {
                userId:String(studentId),
                description:content
            });
    
           
    
            if (response.status === 200) {
                console.log('Description saved successfully', response.data);
                setIsOpen(false);
            } else {
                console.error('Failed to update description');
            }
        } catch (error) {
            console.log('error has occurred: ', error);
        }
    };



    const togglePopUp = () => {
        setIsOpen(!isOpen)
    }
    const handleChangeContent = (e) =>{
        setContent(e.target.value)
    }



    return(
        <div className='profile-container'>
            <img className="profile-img" src='https://placehold.co/150x150' alt="fav icon" />
            <h2>{firstname + " " +  lastname}</h2>
            <p className='profile-info'>{email}</p>
            <p className='profile-info'>{studentId}</p>
            <Button onClick={togglePopUp}>Add Description/Edit Description</Button>
            <p className='profile-info'>{description}</p>

            <Dialog open={isOpen} onClose={handleClose}>

        <DialogTitle>
            Tell your peers what you like!
            <DialogContent>
          
            <Divider sx={{ my: 1 }} />

                <TextField
                    multiline
                    rows={4} 

                  fullWidth
                  label={"Add description/Edit"}
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSaveDescription}>Save</Button>

            </DialogActions>
        </DialogTitle>
        </Dialog>
            <hr className='divider'/>

            <div className='btn-grp'>
                <Button className='profile-btn' variant="contained">Edit Profile</Button>
                <Button className='profile-btn' variant="contained">Settings</Button>
                <Button className='profile-btn' variant="contained" 
                    onClick={() => {
                        navigate('/User/landingpage')
                    }}>Home</Button>
                <Button className='profile-btn' variant="contained">Sign Out</Button>
            </div>
        </div>
    )
}


export default ProfilePage;