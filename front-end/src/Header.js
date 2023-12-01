// Header.js

import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const appBarStyles = {
  backgroundColor: '#5D4037', // Use the new primary color
};

const titleStyles = {
  flexGrow: 1,
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '2rem',
  color: '#FFF8E1', // Contrast color for the title
};

function Header() {
  return (
    <AppBar position="static" style={appBarStyles}>
      <Toolbar>
        <Container maxWidth="lg">
          <Typography variant="h6" style={titleStyles}>
            Readers_Insel
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
