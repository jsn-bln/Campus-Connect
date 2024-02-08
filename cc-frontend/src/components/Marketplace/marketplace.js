import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();


const Marketplace = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
        <div>
            <h1>Marketplace</h1>
        </div>
    </ThemeProvider>
  );
}

export default Marketplace;