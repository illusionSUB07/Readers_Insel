import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Container, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
  flexGrow: 1,
};

const titleStyles = {
  flexGrow: 1,
  textAlign: 'center' as const, 
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: '#FFF8E1',
};

const MergedHeader: React.FC<{ onOpenAddForm: () => void }> = ({ onOpenAddForm }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component="a" href="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component="a" href="/books">
          <ListItemText primary="Books" />
        </ListItem>
        <ListItem button onClick={onOpenAddForm}>
          <ListItemText primary="Add Book" />
        </ListItem>
        <ListItem button component="a" href="/about">
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <AppBar position="static" style={appBarStyles}>
      <Toolbar>
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="menu" 
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Container maxWidth="lg" style={containerStyles}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" style={{ marginRight: '15px', width: '50px', height: 'auto' }} />
            <Typography variant="h6" style={titleStyles}>
              Readers_Insel
            </Typography>
          </Box>
        </Container>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default MergedHeader;
