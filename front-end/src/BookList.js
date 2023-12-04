import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Fab, Modal, Backdrop, Fade } from '@mui/material'; // Correctly import Fab from Material-UI
import AddIcon from '@mui/icons-material/Add';
import BookItem from './BookItem';
import BookForm from './BookForm';

function BookList() {
  const [books, setBooks] = useState([]); // State to hold the list of books
  // const [editingBook, setEditingBook] = useState(null); // Uncomment if implementing edit functionality

  useEffect(() => {
    // Fetch books from the backend on component mount
    axios.get('http://localhost:4002/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  // Function to handle deleting a book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4002/books/${id}`);
      setBooks(books.filter(book => book.id !== id)); // Update the state to reflect the deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // State and functions to control the opening and closing of the add book form modal
  const [openAddForm, setOpenAddForm] = useState(false);

  const handleOpenAddForm = () => {
    // setEditingBook(null); // Reset editing book if implementing edit functionality
    setOpenAddForm(true); // Open the modal for adding a book
  };
  const handleBookAdded = async () => {
    try {
      const response = await axios.get('http://localhost:4002/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    handleCloseAddForm(); // Close the modal
  };


  

  const handleCloseAddForm = () => {
    setOpenAddForm(false); // Close the modal
  };

  // Function to refresh the list of books (e.g., after adding a new book)
  const refreshBooks = async () => {
    try {
      const response = await axios.get('http://localhost:4002/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleBookUpdated = async () => {
    try {
      const response = await axios.get('http://localhost:4002/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    // Add any additional logic if needed, e.g., closing a modal
  };

  
  return (
    
    <div>
      <div className="booklist-container">
      {books.map(book => (
        <BookItem key={book.id} book={book} onDelete={handleDelete}  onEdit={handleBookUpdated} />
        ))}
      {/* Map through the books and render each book item */}

      {/* FAB for opening the add book form modal */}
      <Fab 
        color="primary" 
        aria-label="add" 
        style={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleOpenAddForm}
      >
        <AddIcon />
      </Fab>

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
    </div>

  );
}

export default BookList;
