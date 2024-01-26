import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { styled } from '@mui/material';

const useStyles = styled(() => ({
  footer: {
    color: 'white',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
}));


function Footer() {
    const classes = useStyles();
  
    return (
      <div style={{color: 'white',
      textAlign: 'center',
      position: 'fixed',
      bottom: 0,
      width: '100%',}}>
        
      <Typography variant="body2" color="white" align="center">
      {'Copyright © '}
      <Link color="inherit" href="*">
        Campus Connect
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
        <Typography variant="body2">
          <Link color="inherit" href="#">
            Privacy Policy
          </Link>
          {' | '}
          <Link color="inherit" href="#">
            Terms & Conditions
          </Link>
        </Typography>
      </div>
    );
  }


export default Footer