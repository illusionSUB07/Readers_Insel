import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, IconButton, Modal, Backdrop, Fade } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BookForm from './BookForm'; // Make sure this path is correct

function BookItem({ book, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const modalContentStyle = {
    backgroundColor: 'white', // or your preferred background color
    padding: '20px',
    outline: 'none',
    borderRadius: '10px',
    maxHeight: '80vh', // sets maximum height to 80% of the viewport height
    overflowY: 'auto', // allows vertical scrolling
    width: 'auto', // or set a specific width
  };
  

  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const backdropStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
  };

  return (
    <>
      <Card style={{ 
        margin: '20px', 
        backgroundColor: '#FFECB3', 
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', 
        borderRadius: '10px' 
      }}>
        <CardContent>
          {/* Display book details */}
          <Typography variant="h5" component="div" style={{ marginBottom: '8px', fontWeight: 'bold' }}>{book.title}</Typography>
          <Typography color="text.secondary" style={{ marginBottom: '8px' }}>{book.author}</Typography>
          <Typography color="text.secondary" style={{ marginBottom: '8px' }}>Genre: {book.genre}</Typography>
          <Typography color="text.secondary" style={{ marginBottom: '8px' }}>Description: {book.description}</Typography>
          <Typography color="text.secondary" style={{ marginBottom: '8px' }}>Published Year: {book.published_year}</Typography>
          <Typography color="text.secondary" style={{ marginBottom: '8px' }}>ISBN: {book.isbn}</Typography>
          
          {/* Display book image */}
          {book.image_url ? (
            <img src={book.image_url} alt={book.title} style={{ maxWidth: '100px', marginBottom: '16px' }} />
          ) : (
            <p>No image!</p>
          )}
          
          {/* Like button and likes count */}
          <Button onClick={() => setLikes(likes + 1)}>Like</Button>
          <Typography style={{ marginTop: '8px' }}>{likes} Likes</Typography>
          
          {/* Edit and Delete Buttons */}
          <IconButton color="primary" onClick={handleOpen}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => onDelete(book.id)}>
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>

      {/* Modal for Editing */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-book-modal"
        aria-describedby="modal-to-edit-book-details"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ style: backdropStyle }}
        style={modalStyle}
      >
        <Fade in={open}>
  <div style={modalContentStyle}> {/* Apply modalContentStyle here */}
    <BookForm bookToEdit={book} onBookAdded={() => {
      handleClose();
      onEdit(); 
    }} />
  </div>
</Fade>

      </Modal>
    </>
  );
}

export default BookItem;
