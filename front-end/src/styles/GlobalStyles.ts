import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Playfair Display', serif;
    background-color: #FFF8E1;
    color: #3E2723;
    background-image: url('path-to-your-texture-image.jpg'); // Add a subtle texture
    background-size: cover;
    /* Add more global styles here */
  }
`;

export default GlobalStyles;
