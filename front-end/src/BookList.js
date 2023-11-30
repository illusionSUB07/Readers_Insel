import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from './BookItem';
import BookForm from './BookForm';

// Component to fetch and display list of books
function BookList() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null); // State to manage editing

  useEffect(() => {
    // Fetch books from the backend
    axios.get('http://localhost:4002/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4002/books/${id}`);
      // Update the books state to remove the deleted book
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book); // Set the editing book
  };

  // Function to refresh books list after editing
  const refreshBooks = () => {
    setEditingBook(null); // Reset editing book
    // Re-fetch books or use a better state management
  };

  return (
    <div>
      {/* Conditionally render BookForm for editing */}
      {editingBook && <BookForm onBookAdded={refreshBooks} bookToEdit={editingBook} />}

      {books.map(book => (
        <div key={book.id}>
          <BookItem book={book} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
}

export default BookList;
