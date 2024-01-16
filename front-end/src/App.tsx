import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Footer';
import BookList from './BookList';
import HeroSection from './HeroSection';
import About from './About';
import MergedHeader from './MergedHeader';
import LoginForm from './LoginForm';
import BookForm from './BookForm';
import ErrorScreen from './ErrorScreen';
import { Modal, Backdrop, Fade } from '@mui/material';
import { useBooks } from './hooks';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const { books, state, error, refresh } = useBooks();

  const refreshBooks = () => {
    refresh();
  };

  const handleGetStarted = () => {
    setShowBooks(true);
  };

  const handleOpenAddForm = () => {
    setOpenAddForm(true);
  };

  const handleCloseAddForm = () => {
    setOpenAddForm(false);
  };

  const handleBookAdded = () => {
    refreshBooks();
    handleCloseAddForm();
  };

  const handleOpenLoginForm = () => {
    setShowLoginForm(true);
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowBooks(true); // Redirect to all items screen after logout
  };

  return (
    <Router>
      <div className="App">
        <MergedHeader 
          onOpenAddForm={handleOpenAddForm} 
          onOpenLoginForm={handleOpenLoginForm} 
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />

        {showLoginForm ? (
          <LoginForm onLogin={handleLogin} onCancel={handleCloseLoginForm} />
        ) : (
          <Routes>
            <Route path="/" element={
              <>
                {!showBooks && <HeroSection onGetStarted={handleGetStarted} />}
                {showBooks && (
                  <>
                    {state === 'loading' && <p>Loading books...</p>}
                    {state === 'error' && error && <ErrorScreen error={error} onRetry={refresh} />}
                    {state === 'success' && 
                      <BookList books={books} isLoggedIn={isLoggedIn} onRefresh={refreshBooks} />}
                  </>
                )}
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={
              <BookList books={books} isLoggedIn={isLoggedIn} onRefresh={refreshBooks} />
            } />
          </Routes>
        )}

        <Footer />

        {isLoggedIn && (
          <Modal
            open={openAddForm}
            onClose={handleCloseAddForm}
            BackdropComponent={Backdrop}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Fade in={openAddForm}>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', maxHeight: '80vh', overflowY: 'auto' }}>
                <BookForm onBookAdded={handleBookAdded} />
              </div>
            </Fade>
          </Modal>
        )}
      </div>
    </Router>
  );
};

export default App;
