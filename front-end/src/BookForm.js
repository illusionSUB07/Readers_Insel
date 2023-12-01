import React, { useState, useEffect } from 'react';

import { Button, TextField, Grid, Paper, Typography, CircularProgress } from '@mui/material';

function BookForm({ onBookAdded , bookToEdit}) {
  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    image_url: '',
    published_year: '',
    isbn: '',
  });

  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Prefill form when editing a book
  useEffect(() => {
    if (bookToEdit) {
      setFormData(bookToEdit);
    }
  }, [bookToEdit]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form data
  const validate = () => {
    let tempErrors = {};
    tempErrors.title = formData.title ? '' : 'Title is required';
    tempErrors.author = formData.author ? '' : 'Author is required';
    tempErrors.genre = formData.genre ? '' : 'Genre is required';
    tempErrors.published_year = formData.published_year ? '' : 'Published Year is required';
    tempErrors.isbn = formData.isbn ? '' : 'ISBN is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
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
        setFormData({
          title: '',
          author: '',
          genre: '',
          description: '',
          image_url: '',
          published_year: '',
          isbn: '',
        });
        onBookAdded();
      } else {
        console.error('Failed to add book:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
      <Grid item xs={12} sm={8} lg={6}>
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#FFECB3', color: '#3E2723', position: 'relative' }}>
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
            Edit Details
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
              multiline
              rows={4}
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
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {bookToEdit ? 'Update Book' : 'Add Book'}

            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default BookForm;
