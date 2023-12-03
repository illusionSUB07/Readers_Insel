import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import backgroundImage from './Background.png';

function HeroSection({ onGetStarted }) {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show title
    const titleTimeout = setTimeout(() => setShowTitle(true), 500);

    // Hide title after some time and show subtitle
    const subtitleTimeout = setTimeout(() => {
      setShowTitle(false);
      setShowSubtitle(true);
    }, 4000); // Adjust time as needed

    // Hide subtitle after some time and show button
    const buttonTimeout = setTimeout(() => {
      setShowSubtitle(false);
      setShowButton(true);
    }, 8000); // Adjust time as needed

    return () => {
      clearTimeout(titleTimeout);
      clearTimeout(subtitleTimeout);
      clearTimeout(buttonTimeout);
    };
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div>
        {showTitle && (
          <Typography variant="h2" style={{ animation: 'fadeOut 2s ease-in-out forwards' }}>
            Discover the World of Books
          </Typography>
        )}
        {showSubtitle && (
          <Typography variant="h3" style={{ animation: 'fadeOut 2s ease-in-out forwards' }}>
            Explore a vast collection of literary treasures.
          </Typography>
        )}
      </div>
      {showButton && (
        <Button
          variant="contained"
          color="primary"
          onClick={onGetStarted}
          style={{ animation: 'fadeIn 2s ease-in-out' }}
          sx={{
            '&:hover': { backgroundColor: '#3E2723' },
          }}
        >
          Get Started
        </Button>
      )}
    </Box>
  );
}

export default HeroSection;
