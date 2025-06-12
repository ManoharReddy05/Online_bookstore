import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddBook.css'
const AddBook = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
  });

  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);

  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });

    if (image) formData.append('image', image);
    if (pdf) formData.append('pdf', pdf);

    const response = await fetch('/api/books', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Book added!');
      navigate('/admin');
      setForm({ title: '', author: '', description: '', price: '' });
      setImage(null);
      setPdf(null);
    } else {
      alert('Failed to add book');
    }
  };

  return (
    <div className="add-book-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="add-book-form">
        <h2 className="form-title">Add Book</h2>
        {['title', 'author', 'description', 'price'].map(field => (
          <div key={field} className="form-group">
            <input
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              required={['title', 'author', 'price'].includes(field)}
              className="form-input"
            />
          </div>
        ))}
        <div className="form-group">
          <label className="form-label">Cover Image</label>
          <input
            type="file"
            onChange={e => setImage(e.target.files[0])}
            className="form-file-input"
            accept="image/*"
          />
        </div>
        <div className="form-group">
          <label className="form-label">PDF File</label>
          <input
            type="file"
            onChange={e => setPdf(e.target.files[0])}
            className="form-file-input"
            accept="application/pdf"
          />
        </div>
        <button type="submit" className="submit-button">Add</button>
      </form>
    </div>
  );
};

export default AddBook;