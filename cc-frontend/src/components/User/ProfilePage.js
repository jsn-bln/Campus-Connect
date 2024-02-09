import './ProfilePage.css'
import { Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
function ProfilePage(){

    const userData = JSON.parse(localStorage.getItem('userData'));
    const { email, firstname, lastname, studentId }  = userData;
    const navigate = useNavigate();


    return(
        <div className='profile-container'>
            <img className="profile-img" src='https://placehold.co/150x150' alt="fav icon" />
            <h2>{firstname + " " +  lastname}</h2>
            <p className='profile-info'>{email}</p>
            <p className='profile-info'>{studentId}</p>
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