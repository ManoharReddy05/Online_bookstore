import React, { useEffect, useState } from 'react';
import UserBookCard from './UserBookCard';
import Navbar from './NavBar';
import './UserHome.css';

const UserHome = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Fetch all books from backend
  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setFilteredBooks(data);
      })
      .catch(() => alert('Failed to fetch books'));
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBooks(filtered);
  };


  return (
    <div className="user-home">
      <Navbar />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search books by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <h2 className="section-title">Explore Books</h2>
      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(({ _id, ...rest }) => (
            <UserBookCard
              key={_id}
              id={_id}
              {...rest}
              onAddToCart={() => handleAddToCart({ _id, ...rest })}
              onAddToFavorites={() => handleAddToFavorites({ _id, ...rest })}
            />
          ))
        ) : (
          <p className="no-results">No books match your search.</p>
        )}
      </div>
    </div>
  );
};

export default UserHome;