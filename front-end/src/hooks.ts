import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

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

function useBooks() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [state, setState] = useState<'initial' | 'loading' | 'success' | 'error'>('initial');
  const [error, setError] = useState<Error | null>(null);

  const fetchBooks = useCallback(async () => {
    setState('loading');
    try {
      const response = await axios.get<IBook[]>('http://localhost:4002/aa');
      setBooks(response.data);
      setState('success');
    } catch (err: any) {
        console.error("Error fetching books:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setState('error');
      }
      
  }, []);

  useEffect(() => {
    fetchBooks();

    const intervalId = setInterval(fetchBooks, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchBooks]);

  const refresh = () => {
    fetchBooks();
  };

  return {
    books,
    state,
    error,
    refresh
  };
}

export { useBooks };
