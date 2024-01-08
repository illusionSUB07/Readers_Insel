import React, { useState } from 'react';
import Footer from './Footer';
import BookList from './BookList';
import HeroSection from './HeroSection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Modal, Backdrop, Fade } from '@mui/material';
import BookForm from './BookForm'; 
import About from './About';
import MergedHeader from './MergedHeader';
import { useBooks } from './hooks';
import ErrorScreen from './ErrorScreen'; 


const App: React.FC = () => {
  const [showBooks, setShowBooks] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false); 

  const { books, state, error, refresh } = useBooks();

  const refreshBooks = () => {
    refresh(); // Directly calling the refresh function from the hook
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
    refreshBooks(); // Refresh the books list after a book is added
    handleCloseAddForm();
  };
  const handleRetry = () => {
    refresh();
  };

  return (
    <Router>
      <div className="App">
        <MergedHeader onOpenAddForm={handleOpenAddForm} />
        <Routes>
          <Route path="/" element={
                <>
                {!showBooks && <HeroSection onGetStarted={handleGetStarted} />}
                {showBooks && (
                  <>
                    {state === 'loading' && <p>Loading books...</p>}
                    {state === 'error' && error && <ErrorScreen error={error} onRetry={refresh} />}
                    {state === 'success' && <BookList books={books} onRefresh={refreshBooks} />}
                  </>
                )}
              </>
            } />
          
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<BookList books={books} onRefresh={refreshBooks} />} />
        </Routes>
        <Footer />

        {/* Modal for adding a new book */}
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
      </div>
    </Router>
  );
};

export default App;
