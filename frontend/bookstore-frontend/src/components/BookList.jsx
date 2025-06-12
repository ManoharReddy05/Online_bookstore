import React, { useEffect, useState } from 'react';

const BookList = ({ books: propBooks = null, onSelect, action = 'Select' }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!propBooks) {
      // If books not provided by props, fetch all
      fetch('/api/books')
        .then(res => res.json())
        .then(setBooks)
        .catch(() => alert('Failed to load books'));
    } else {
      setBooks(propBooks);
    }
  }, [propBooks]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{action} a Book</h2>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {books.map(book => (
            <div
              key={book._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                width: '250px',
              }}
            >
              <strong>{book.title}</strong>
              <p>by {book.author}</p>
              <p>₹{book.price}</p>
              <button onClick={() => onSelect(book)}>{action}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
