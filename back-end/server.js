// Import necessary modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4002;

// Use CORS to allow cross-origin requests
app.use(cors());

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "LAB",
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

// GET route to fetch all books
app.get('/books', (req, res) => {
  connection.query('SELECT * FROM books', (error, results) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.json(results);
  });
});

// POST route to add a new book
app.post('/books', (req, res) => {
  const newBook = req.body; 
  connection.query('INSERT INTO books SET ?', newBook, (error, results) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.status(201).send('Book added successfully');
  });
});

// PUT route to update a book
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;
  connection.query('UPDATE books SET ? WHERE id = ?', [updatedBook, id], (error, results) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.send('Book updated successfully');
  });
});

// DELETE route to delete a book
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM books WHERE id = ?', id, (error, results) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.send('Book deleted successfully');
  });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
