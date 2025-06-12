import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import BookCard from './BookCard';
import './AdminHome.css'

const AdminHome = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/api/books', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(setBooks)
      .catch(() => alert('Failed to load books'));
  }, []);

  return (
    <div className="admin-home" style={{  textAlign: 'center' }}>
      <h1>Welcome Admin</h1>
      <div className='nav'>
        <button onClick={() => navigate('/admin/add-book')}>Add Book</button>
        <button onClick={() => navigate('/admin/update-book')}>Update Book</button>
        <button onClick={() => navigate('/admin/delete-book')}>Delete Book</button>
        <LogoutButton />
      </div>

      <h2>All Books</h2>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' ,gap: '1rem' }}>
          {books.map(book => (
            <BookCard
              imageUrl={book.imageUrl}
              key={book._id}
              title={book.title}
              author={book.author}
              
              price={book.price}

            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminHome;

