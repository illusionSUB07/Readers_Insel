import React, { useState } from 'react';
import { Typography, IconButton, Button, CardContent, Modal, Backdrop, Fade } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css'; 
import BookForm from './BookForm';


function BookItem({ book, onEdit, onDelete }) {
  const [likes, setLikes] = useState(0);
  const [open, setOpen] = useState(false); // State to control the modal

  // Style for the modal content
  const modalContentStyle = {
    padding: '20px',
    backgroundColor: 'white',
    outline: 'none',
    borderRadius: '10px',
    maxHeight: '80vh', // Set a maximum height
    overflowY: 'auto', // Enable vertical scrolling
    // Other styles as required
  };
  

  // Define handleOpen and handleClose
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Custom style for the backdrop
  const backdropStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Customize the backdrop's background color
    backdropFilter: 'blur(5px)', // Apply blur to the backdrop
  };
  

  return (
    <div className="flip-card" style={{ margin: '20px' }}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {book.image_url ? (
            <img src={book.image_url} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          ) : (
            <p>No image!</p>
          )}
          <Typography variant="h6" component="div" style={{ position: 'absolute', bottom: 10, left: 10, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '4px', borderRadius: '4px' }}>
            {book.title}
          </Typography>
        </div>
        <div className="flip-card-back" style={{ backgroundColor: '#FFECB3', borderRadius: '10px' }}>
          <CardContent>
            <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>{book.title}</Typography>
            <Typography color="text.secondary">Author: {book.author}</Typography>
            <Typography color="text.secondary">Genre: {book.genre}</Typography>
            <Typography color="text.secondary">Published Year: {book.published_year}</Typography>
            <Typography color="text.secondary">Description: {book.description}</Typography>
            <Typography color="text.secondary">ISBN: {book.isbn}</Typography>
            <Button onClick={() => setLikes(likes + 1)}>Like</Button>
            <Typography style={{ marginTop: '8px' }}>{likes} Likes</Typography>
            <IconButton color="primary" onClick={handleOpen}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" onClick={() => onDelete(book.id)}>
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </div>
      </div>
  
      {/* Modal for Editing */}
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-book-modal"
      aria-describedby="modal-to-edit-book-details"
      closeAfterTransition
      BackdropComponent={Backdrop} // Use Backdrop as the BackdropComponent
  BackdropProps={{
style: backdropStyle  }}
    >
        <Fade in={open}>
          <div style={modalContentStyle}>
            <BookForm bookToEdit={book} onBookAdded={() => {
              handleClose();
              onEdit(); // You might need to pass some data to onEdit
            }} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
    
}

export default BookItem;
