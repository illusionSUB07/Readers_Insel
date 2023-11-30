import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Component to display each book's details
function BookItem({ book, onEdit, onDelete }) {
  const [likes, setLikes] = useState(0);

  return (
    <Card style={{ margin: '20px' }}>
      <CardContent>
        {/* Display book details */}
        <Typography variant="h5" component="div" style={{ marginBottom: '8px' }}>{book.title}</Typography>
        <Typography color="text.secondary" style={{ marginBottom: '8px' }}>{book.author}</Typography>
        <Typography color="text.secondary" style={{ marginBottom: '8px' }}>Genre: {book.genre}</Typography>
        <Typography color="text.secondary" style={{ marginBottom: '8px' }}>Description: {book.description}</Typography>
        <Typography color="text.secondary" style={{ marginBottom: '8px' }}>Published Year: {book.published_year}</Typography>
        <Typography color="text.secondary" style={{ marginBottom: '8px' }}>ISBN: {book.isbn}</Typography>
        
        {/* Display book image or a message if no image */}
        {book.image_url ? (
          <img src={book.image_url} alt={book.title} style={{ maxWidth: '100px', marginBottom: '16px' }} />
        ) : (
          <p>No image!</p>
        )}
        
        {/* Like button and likes count */}
        <Button onClick={() => setLikes(likes + 1)}>Like</Button>
        <Typography style={{ marginTop: '8px' }}>{likes} Likes</Typography>
        
        {/* Edit and Delete Buttons */}
        <IconButton color="primary" onClick={() => onEdit(book)}>
          <EditIcon />
        </IconButton>
        <IconButton color="secondary" onClick={() => onDelete(book.id)}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default BookItem;
