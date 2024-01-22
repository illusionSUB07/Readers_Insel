import React, { useState } from 'react';
import { Typography, IconButton, CardContent, Modal, Backdrop, Fade } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../styles/App.css';
import BookForm from './BookForm';

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

interface IBookItemProps {
  book: IBook;
  onEdit: () => void;
  onDelete: (id: string) => void;
  isLoggedIn: boolean;
}

const BookItem: React.FC<IBookItemProps> = ({ book, onEdit, onDelete, isLoggedIn }) => {
  const [likes, setLikes] = useState(0);
  const [open, setOpen] = useState(false); 
  const [isSelected, setIsSelected] = useState(false); 

  const toggleCard = () => {
    setIsSelected(!isSelected);
    setTimeout(() => {
      setIsSelected(false);
    }, 1000);
  };

  const modalContentStyle = {
    padding: '20px',
    backgroundColor: 'white',
    outline: 'none',
    borderRadius: '10px',
    maxHeight: '80vh',
    overflowY: 'auto' as const 
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const backdropStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
  };

  return (
    <div className={`flip-card ${isSelected ? 'flip-card-selected' : ''}`} style={{ margin: '20px' }} onClick={toggleCard}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {book.image_url ? (
            <img src={book.image_url} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          ) : (
            <p>No image!</p>
          )}
        </div>
        <div className="flip-card-back" style={{ backgroundColor: '#FFECB3', borderRadius: '10px' }}>
          <CardContent>
            <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>{book.title}</Typography>
            <Typography color="text.secondary"> <strong>Author:</strong> {book.author}</Typography>
            <Typography color="text.secondary"><strong> Genre: </strong> {book.genre}</Typography>
            <Typography color="text.secondary"><strong> Published Year: </strong> {book.published_year}</Typography>
            <Typography color="text.secondary"><strong> Description: </strong> {book.description}</Typography>
            <Typography color="text.secondary"><strong> ISBN: </strong> {book.isbn}</Typography>
            <button className={`button-like ${likes > 0 ? 'liked' : ''}`} onClick={() => setLikes(likes + 1)}>
              <FavoriteIcon style={{ verticalAlign: 'middle' }} />
              <span>{likes} Likes</span>
            </button>
            {isLoggedIn && (
              <div className="edit-delete-container">
                <IconButton color="primary" onClick={handleOpen}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => onDelete(book.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
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
        BackdropComponent={Backdrop}
        BackdropProps={{ style: backdropStyle }}
      >
        <Fade in={open}>
          <div style={modalContentStyle}>
            <BookForm bookToEdit={book} onBookAdded={() => {
              handleClose();
              onEdit();
            }} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default BookItem;
