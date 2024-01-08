import React, { useState } from 'react';
import { Fab, Modal, Backdrop, Fade } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BookItem from './BookItem';
import BookForm from './BookForm';
import axios from 'axios';


// Define an interface for the book object
interface IBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  image_url: string;
  published_year: string;
  isbn: string;
}

interface BookListProps {
  books: IBook[]; 
  onRefresh: () => void; // Function to refresh the books list
}

const BookList: React.FC<BookListProps> = ({ books, onRefresh }) => {
  const [openAddForm, setOpenAddForm] = useState(false);

  const handleOpenAddForm = () => {
    setOpenAddForm(true); // Open the modal for adding a book
  };

  const handleCloseAddForm = () => {
    setOpenAddForm(false); // Close the modal
  };

  const handleBookAdded = () => {
    onRefresh(); // Refresh the books list after a book is added
    handleCloseAddForm();
  };

  // Function to handle deleting a book
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4002/books/${id}`);
      onRefresh(); // Refresh the books list after a book is deleted
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleBookUpdated = () => {
    onRefresh(); // Refresh the books list after a book is updated
  };

  return (
    <div className="booklist-container">
      {books.map(book => (
        <BookItem 
          key={book.id} 
          book={book} 
          onDelete={handleDelete} 
          onEdit={handleBookUpdated} 
        />
      ))}

{/*
<Fab 
  color="primary" 
  aria-label="add" 
  style={{ position: 'fixed', bottom: 16, right: 16 }}
  onClick={handleOpenAddForm}
>
  <AddIcon />
</Fab>
*/}
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
  );
}

export default BookList;
