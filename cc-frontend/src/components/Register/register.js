import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';




const defaultTheme = createTheme();

export default function Register() {

  const [registrationSuccess, setRegistrationSuccess] = React.useState(false);
  const [gender, setGender] = React.useState('');

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const creds = new FormData(event.currentTarget);
    const data = {
      studentId: creds.get('studentNumber'),
      email: creds.get('email'),
      password: creds.get('password'),
      firstname: creds.get('firstName'),
      lastname: creds.get('lastName'),
      birthday: creds.get('birthday'),
      gender: creds.get('gender'),
    };

    if(data.password === creds.get('cpassword')){
      console.log(data)
    }


    axios.post("http://localhost:8080/api/v1/user/signup", data)
      .then((response) => {
        if(response.status){
          setRegistrationSuccess(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log('Server responded with:', error.response.status);
          console.log('Error data:', error.response.data);
        } else if (error.request) {
          console.log('No response received:', error.request);
        } else {
          console.log('Error during request setup:', error.message);
        }
       })
  };

  React.useEffect(() => {
    if (registrationSuccess) {
      const timerId = setTimeout(() => {
        setRegistrationSuccess(false);
      }, 5000);
      return () => clearTimeout(timerId);
    }
  }, [registrationSuccess]);


  return (
    <ThemeProvider theme={defaultTheme}>
      


      {registrationSuccess && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Signup success, wait for x business days for account confirmation
        </Alert>
      )}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5"  sx={{ input: { color: 'red' } }}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="student-number"
                  name="studentNumber"
                  required
                  fullWidth
                  id="studentNumber"
                  label="Student Number"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Student Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="birthday"
                  name="birthday"
                  label="Birthday"
                  renderInput={(props) => <TextField {...props} variant="outlined" fullWidth />}
                />
              </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      value={gender}
                      onChange={handleChange}
                      label="Gender"
                      name='gender'
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              <Grid item xs={12}>
                <input accept="image/*" style={{display:'none'}} id="file" name="file" type="file" />
                <label htmlFor='file'>
                    <Button variant="outlined" component="span">Upload Student ID</Button>
                </label>
                
                </Grid>
                
            </Grid>

            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}