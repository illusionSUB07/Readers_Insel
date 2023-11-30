// App.js
import React, { useState } from 'react';
import Header from './Header';
import BookList from './BookList';
import BookForm from './BookForm'; // Import the BookForm component

function App() {
  const [books, setBooks] = useState([]);

  const handleBookAdded = (newBook) => {
    // Update the book list with the newly added book
    setBooks([...books, newBook]);
  };

  return (
    <div>
      <Header />
      <BookForm onBookAdded={handleBookAdded} /> {/* Add BookForm component */}
      <BookList books={books} /> {/* Pass books as props */}
    </div>
  );
}

export default App;
