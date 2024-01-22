import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import Logo from './AppLogo.jpeg';

const appBarStyles = {
  backgroundColor: '#5D4037',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  borderBottom: '2px solid #FFF8E1',
};

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};


const titleStyles = {
  flexGrow: 1,
  textAlign: 'center' as const,
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: '#FFF8E1',
};

const Header: React.FC = () => {
  return (
    <AppBar position="static" style={appBarStyles}>
      <Toolbar>
        <Container maxWidth="lg" style={containerStyles}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" style={{ marginRight: '15px', width: '50px', height: 'auto' }} />
            <Typography variant="h6" style={titleStyles}>
              Readers_Insel
            </Typography>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
