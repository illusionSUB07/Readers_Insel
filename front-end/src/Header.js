import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

// Header component with app title
function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Readers_Insel</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
