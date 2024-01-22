import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5D4037', // A deep brown, like an old book cover
    },
    secondary: {
      main: '#C5E1A5', // A soft green, reminiscent of vintage paper
    },
    background: {
      default: '#FFF8E1', // A soft off-white, like aged paper
      paper: '#FFECB3',   // A slightly darker shade for paper components
    },
    text: {
      primary: '#3E2723',     // Dark brown for text, for a softer contrast
    },
  },
  typography: {
    fontFamily: 'Playfair Display, serif', // A classic serif font for a literary feel
  },
});

export default theme;
