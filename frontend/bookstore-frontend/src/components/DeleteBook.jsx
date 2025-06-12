import React, { useEffect, useState } from 'react';
import BookList from './BookList';
import { useNavigate } from 'react-router-dom';
import './DeleteBook.css'

const DeleteBook = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/books');
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      alert('Failed to load books');
    }
  };

  const handleDelete = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Book deleted');
        navigate('/admin');
        fetchBooks(); // Refresh list
      } else {
        alert('Failed to delete book');
      }
    } catch (err) {
      alert('Error deleting book');
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="delete-book-container">
      <h2 className="section-title">Delete a Book</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <BookList books={filteredBooks} onSelect={book => handleDelete(book._id)} action="Delete" />
    </div>
  );
};

export default DeleteBook;