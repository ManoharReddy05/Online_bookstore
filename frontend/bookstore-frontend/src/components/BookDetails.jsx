import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './BookDetails.css';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if payment done from state
    const paid = location.state?.paid || false;

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/books/${id}`);
                if (!response.ok) throw new Error('Failed to fetch book');
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleDownload = () => {
        if (!book.pdfUrl) {
            alert('Sorry, PDF not available');
            return;
        }
        // Download PDF
        const link = document.createElement('a');
        link.href = book.pdfUrl.startsWith('http')
            ? book.pdfUrl
            : `http://localhost:5000${book.pdfUrl}`;
        link.download = `${book.title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <p className="loading-message">Loading...</p>;
    if (!book) return <p className="error-message">Book not found.</p>;

    return (
        <div className="book-details-container">
            <div className="book-image-section">
                <img
                    src={book.imageUrl?.startsWith('http') ? book.imageUrl : `http://localhost:5000${book.imageUrl}`}
                    alt={book.title}
                    className="book-image"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/320x480?text=No+Image';
                    }}
                />
                {!paid ? (
                    <button
                        className="buy-button"
                        onClick={() => navigate(`/books/${book._id}/payment`)}
                    >
                        Buy Now – ₹{book.price}
                    </button>
                ) : (
                    <button className="download-button" onClick={handleDownload}>
                        📥 Download PDF
                    </button>
                )}
            </div>

            <div className="book-details-info">
                <h1 className="book-title">{book.title}</h1>
                <h3 className="book-author">by {book.author}</h3>
                <p className="book-description">{book.description || 'No description available.'}</p>
                <p className="book-price">₹{book.price}</p>
            </div>
        </div>
    );
};

export default BookDetails;