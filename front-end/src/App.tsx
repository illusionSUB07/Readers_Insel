import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Footer from './components/Footer';
import BookList from './pages/BookList';
import HeroSection from './pages/HeroSection';
import About from './components/About';
import MergedHeader from './components/MergedHeader';
import LoginForm from './pages/LoginForm';
import BookForm from './pages/BookForm';
import ErrorScreen from './pages/ErrorScreen';
import { Modal, Backdrop, Fade } from '@mui/material';
import { useBooks } from './hooks';
import ProtectedRoute from './Routes/ProtectedRoute';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const { books, state, error, refresh } = useBooks();

  const EditBookFormWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const bookToEdit = books.find(book => book.id === id);
    return <BookForm bookToEdit={bookToEdit} onBookAdded={handleBookAdded} />;
  };

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
    localStorage.setItem('isLoggedIn', 'true'); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowBooks(true); // Redirect to all items screen after logout
    localStorage.setItem('isLoggedIn', 'false'); 
  };

  // On component mount, check localStorage
  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(storedLoginState);
  }, []);

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
            <Route
              path="/addNewItem"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <BookForm onBookAdded={handleBookAdded} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/item/:id/edit"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <EditBookFormWrapper />
                </ProtectedRoute>
              }
            />
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
