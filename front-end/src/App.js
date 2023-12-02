// App.js
import React, { useState } from 'react';
import Header from './Header';
import BookList from './BookList';

function App() {
  const [books, setBooks] = useState([]);

  const handleBookAdded = (newBook) => {
    // Update the book list with the newly added book
    setBooks([...books, newBook]);
  };

  return (
    <div>
      <Header />
      <BookList books={books} onBookAdded={handleBookAdded} /> {/* Pass books and onBookAdded as props */}
    </div>
  );
}

export default App;
