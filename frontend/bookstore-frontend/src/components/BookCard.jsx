import React from 'react';

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '1rem',
  margin: '1rem',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '250px',
  background: '#fff',
  boxSizing: 'border-box'
};




const BookCard = ({ title, author, price, category, imageUrl }) => {
  // Fallback image if loading fails
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/250x500?text=No+Image';
  };

  // If the imageUrl starts with "/", assume it's from local backend
  const imageSrc = imageUrl
    ? imageUrl.startsWith('http') ? imageUrl : `http://localhost:5000${imageUrl}`
    : 'https://via.placeholder.com/250x180?text=No+Image';

  return (
    <div style={cardStyle}>
      <img
        src={imageSrc}
        alt={title}
        onError={handleImageError}
        style={{ width: '100%', height: '250px', objectFit: 'contain', borderRadius: '5px' }}
      />
      <h3>{title}</h3>
      <p><strong>Author:</strong> {author}</p>
      <p><strong>Price:</strong> ₹{price}</p>
    </div>
  );
};

export default BookCard;

