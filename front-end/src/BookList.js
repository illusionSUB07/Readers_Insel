import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Fab, Modal, Backdrop, Fade } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BookItem from './BookItem';
import BookForm from './BookForm';

function BookList() {
  const [books, setBooks] = useState([]);
  const [openAddForm, setOpenAddForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4002/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4002/books/${id}`);
    setBooks(books.filter(book => book.id !== id));
  };

  const handleOpenAddForm = () => setOpenAddForm(true);
  const handleCloseAddForm = () => setOpenAddForm(false);

  const refreshBooks = () => {
    setOpenAddForm(false);
    axios.get('http://localhost:4002/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => console.error('Error fetching books:', error));
  };

  return (
    <div>
      {books.map(book => (
        <div key={book.id}>
          <BookItem book={book} onDelete={handleDelete} />
        </div>
      ))}

      <Fab 
        color="primary" 
        aria-label="add" 
        style={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleOpenAddForm}
      >
        <AddIcon />
      </Fab>

      <Modal
        open={openAddForm}
        onClose={handleCloseAddForm}
        BackdropComponent={Backdrop}
        closeAfterTransition
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Fade in={openAddForm}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', maxHeight: '80vh', overflowY: 'auto' }}>
            <BookForm onBookAdded={refreshBooks} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default BookList;
