import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import backgroundImage from './Background.png';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const [showTitle, setShowTitle] = useState<boolean>(false);
  const [showSubtitle, setShowSubtitle] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    const titleTimeout = setTimeout(() => setShowTitle(true), 500);
    const subtitleTimeout = setTimeout(() => {
      setShowTitle(false);
      setShowSubtitle(true);
    }, 3000);
    const buttonTimeout = setTimeout(() => {
      setShowSubtitle(false);
      setShowButton(true);
    }, 6000);

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
          <Typography variant="h2" style={{ animation: 'fadeIn 2s ease-in-out, fadeOut 2s ease-in-out 3s forwards' }}>
            Welcome to Readers_Insel!
          </Typography>
        )}
        {showSubtitle && (
          <Typography variant="h3" style={{ animation: 'fadeIn 2s ease-in-out, fadeOut 2s ease-in-out 3s forwards' }}>
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
