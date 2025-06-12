import { useNavigate } from 'react-router-dom';


const UserBookCard = ({ id, title, author, price, category, imageUrl }) => {
  const navigate = useNavigate();

  const imageSrc = imageUrl
    ? imageUrl.startsWith('http') ? imageUrl : `http://localhost:5000${imageUrl}`
    : 'https://via.placeholder.com/250x180?text=No+Image';

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '1rem',
    margin: '1rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    width: '250px',
    background: '#fff'
  };

  const handleBuyNow = () => {
    navigate(`/book/${id}`);
  };

  return (
    <div style={cardStyle}>
      <img
        src={imageSrc}
        alt={title}
        style={{ width: '100%', height: '180px', objectFit: 'contain', borderRadius: '5px' }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/250x180?text=No+Image';
        }}
      />
      <h3>{title}</h3>
      <p><strong>Author:</strong> {author}</p>
      <p><strong>Price:</strong> ₹{price}</p>
      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};

export default UserBookCard;
