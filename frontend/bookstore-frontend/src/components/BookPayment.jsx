import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BookPayment.css";

const BookPayment = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentDone, setPaymentDone] = useState(false);

  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`);
        if (!response.ok) throw new Error("Failed to fetch book");
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

  const validateForm = () => {
    const errors = {};
    if (!formData.cardName.trim()) errors.cardName = "Name on card is required";
    if (!/^\d{16}$/.test(formData.cardNumber)) errors.cardNumber = "Card number must be 16 digits";
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) errors.expiry = "Expiry must be MM/YY";
    if (!/^\d{3}$/.test(formData.cvv)) errors.cvv = "CVV must be 3 digits";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    alert("Payment Successful!");
    setPaymentDone(true);
  };

  const handleDownload = () => {
    if (!book?.pdfUrl) {
      alert("PDF not available");
      return;
    }
    const url = book.pdfUrl.startsWith("http")
      ? book.pdfUrl
      : `http://localhost:5000${book.pdfUrl}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = `${book.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p className="loading-message">Loading...</p>;
  if (!book) return <p className="error-message">Book not found.</p>;

  return (
    <div className="book-payment-container">
      <div className="left-panel">
        <img
          src={
            book.imageUrl?.startsWith("http")
              ? book.imageUrl
              : `http://localhost:5000${book.imageUrl}`
          }
          alt={book.title}
          className="book-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/260x400?text=No+Image";
          }}
        />

        {!paymentDone && (
          <form className="payment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="cardName"
                placeholder="Name on Card"
                value={formData.cardName}
                onChange={handleChange}
                className="form-input"
              />
              {formErrors.cardName && (
                <small className="error-message">{formErrors.cardName}</small>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number (16 digits)"
                maxLength="16"
                value={formData.cardNumber}
                onChange={handleChange}
                className="form-input"
              />
              {formErrors.cardNumber && (
                <small className="error-message">{formErrors.cardNumber}</small>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="expiry"
                placeholder="Expiry (MM/YY)"
                maxLength="5"
                value={formData.expiry}
                onChange={handleChange}
                className="form-input"
              />
              {formErrors.expiry && (
                <small className="error-message">{formErrors.expiry}</small>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="cvv"
                placeholder="CVV (3 digits)"
                maxLength="3"
                value={formData.cvv}
                onChange={handleChange}
                className="form-input"
              />
              {formErrors.cvv && (
                <small className="error-message">{formErrors.cvv}</small>
              )}
            </div>
            <button type="submit" className="submit-button">
              Proceed to Pay ₹{book.price}
            </button>
          </form>
        )}

        {paymentDone && (
          <button className="download-button" onClick={handleDownload}>
            📥 Download PDF
          </button>
        )}
      </div>

      <div className="right-panel">
        <h1 className="book-title">{book.title}</h1>
        <h3 className="book-author">by {book.author}</h3>
        <p className="book-description">{book.description || "No description available."}</p>
        <p className="book-price">Price: ₹{book.price}</p>
      </div>
    </div>
  );
};

export default BookPayment;