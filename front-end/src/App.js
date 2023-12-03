import React, { useState } from 'react';
import Header from './Header';
import BookList from './BookList';
import HeroSection from './HeroSection'; // Adjust the path based on your directory structure

function App() {
  const [showBooks, setShowBooks] = useState(false); // State to control BookList visibility

  const handleGetStarted = () => {
    setShowBooks(true); // Show BookList when "Get Started" is clicked
  };

  return (
    <div>
      {showBooks ? (
        <>
          <Header />
          <BookList />
        </>
      ) : (
        <HeroSection onGetStarted={handleGetStarted} />
      )}
    </div>
  );
}

export default App;
