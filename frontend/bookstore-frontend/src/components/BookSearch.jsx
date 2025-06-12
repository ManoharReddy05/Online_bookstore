import React, { useState } from 'react';

const BookSearch = ({ onResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const res = await fetch(`/api/books/search?title=${encodeURIComponent(query)}`);
    const data = await res.json();
    onResults(data);
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search by book title"
        style={{ padding: '0.5rem', width: '60%' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '1rem' }}>
        Search
      </button>
    </div>
  );
};

export default BookSearch;
