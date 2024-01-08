import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Grid, Paper, Typography, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

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

interface IBookFormProps {
  onBookAdded: () => void;
  bookToEdit?: IBook;
}

interface IFormData {
  title: string;
  author: string;
  genre: string;
  description: string;
  image_url: string;
  published_year: string;
  isbn: string;
}

interface IErrors {
  [key: string]: string | undefined;
}

const BookForm: React.FC<IBookFormProps> = ({ onBookAdded, bookToEdit }) => {
  const [formData, setFormData] = useState<IFormData>({
    title: '',
    author: '',
    genre: '',
    description: '',
    image_url: '',
    published_year: '',
    isbn: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<IErrors>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (bookToEdit) {
      setFormData(bookToEdit);
    }
  }, [bookToEdit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const tempErrors: IErrors = {};
    tempErrors.title = formData.title ? '' : 'Title is required';
    tempErrors.author = formData.author ? '' : 'Author is required';
    tempErrors.genre = formData.genre ? '' : 'Genre is required';
    tempErrors.published_year = formData.published_year ? '' : 'Published Year is required';
    tempErrors.isbn = formData.isbn ? '' : 'ISBN is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const url = bookToEdit ? `http://localhost:4002/books/${bookToEdit.id}` : 'http://localhost:4002/books';
    const method = bookToEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        onBookAdded();
        navigate('/books'); // After successful submission, navigate back to the BookItem screen
      } else {
        console.error('Failed to add book:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    window.location.href = '/books';
  };

  return (
    <div className="full-page-form">
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={8} lg={6}>
          <Paper elevation={3} className={`full-page-form-paper ${bookToEdit ? 'flip-card-selected' : ''}`} style={{ padding: '20px', backgroundColor: '#FFECB3', color: '#3E2723', position: 'relative' }}>
          <IconButton
              onClick={handleCancel}
              style={{ position: 'absolute', top: '10px', right: '10px' }}
            >
              <CloseIcon />
            </IconButton>
            {loading && (
              <CircularProgress
                size={24}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
            <Typography variant="h5" gutterBottom>
              {bookToEdit ? 'Edit Book Details' : 'Add Book Details'}
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
              {/* Title Field */}
              <TextField
                name="title"
                label="Title"
                fullWidth
                variant="outlined"
                margin="normal"
                value={formData.title}
                onChange={handleChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
                required
              />
              {/* Author Field */}
              <TextField
                name="author"
                label="Author"
                fullWidth
                variant="outlined"
                margin="normal"
                value={formData.author}
                onChange={handleChange}
                error={Boolean(errors.author)}
                helperText={errors.author}
                required
              />
              {/* Genre Field */}
              <TextField
                name="genre"
                label="Genre"
                fullWidth
                variant="outlined"
                margin="normal"
                value={formData.genre}
                onChange={handleChange}
                error={Boolean(errors.genre)}
                helperText={errors.genre}
                required
              />
              {/* Description Field */}
              <TextField
                name="description"
                label="Description"
                fullWidth
                variant="outlined"
                margin="normal"
                value={formData.description}
                onChange={handleChange}
              />
              {/* Image URL Field */}
              <TextField
                name="image_url"
                label="Image URL"
                fullWidth
                variant="outlined"
                margin="normal"
                value={formData.image_url}
                onChange={handleChange}
              />
              {/* Published Year Field */}
              <TextField
                name="published_year"
                label="Published Year"
                fullWidth
                variant="outlined"
                margin="normal"
                value={formData.published_year}
                onChange={handleChange}
                error={Boolean(errors.published_year)}
                helperText={errors.published_year}
                required
              />
              {/* ISBN Field */}
              <TextField
                name="isbn"
                label="ISBN"
                fullWidth
                variant="outlined"
                margin="normal"
                value={formData.isbn}
                onChange={handleChange}
                error={Boolean(errors.isbn)}
                helperText={errors.isbn}
                required
              />
              {/* Submit Button */}
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {bookToEdit ? 'Save Changes' : 'Add Book'}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default BookForm;
