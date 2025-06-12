import React, { useEffect, useState } from 'react';
import BookList from './BookList';
import './UpdateBook.css';

const UpdateBook = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: '',
    image: null,   // updated from imageUrl
    pdf: null,     // updated from pdfUrl
  });

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(setBooks)
      .catch(() => alert('Failed to load books'));
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (files) {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('author', form.author);
    formData.append('price', form.price);
    if (form.image) formData.append('image', form.image);
    if (form.pdf) formData.append('pdf', form.pdf);

    const response = await fetch(`/api/books/${selectedBook._id}`, {
      method: 'PUT',
      body: formData,
    });

    if (response.ok) {
      alert('Book updated!');
      setSelectedBook(null);
      const updatedBooks = await fetch('/api/books').then(res => res.json());
      setBooks(updatedBooks);
    } else {
      alert('Update failed');
    }
  };

  const handleBookSelect = book => {
    setSelectedBook(book);
    setForm({
      title: book.title || '',
      author: book.author || '',
      price: book.price || '',
      image: null,
      pdf: null,
    });
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="update-book-container">
      {!selectedBook ? (
        <>
          <h2 className="section-title">Update a Book</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <BookList books={filteredBooks} onSelect={handleBookSelect} action="Update" />
        </>
      ) : (
        <div className="form-container">
          <form onSubmit={handleUpdate} className="update-book-form" encType="multipart/form-data">
            <h2 className="form-title">Editing: {selectedBook.title}</h2>
            <div className="form-group">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Author"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Choose new image (optional):</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Choose new PDF (optional):</label>
              <input
                type="file"
                name="pdf"
                accept="application/pdf"
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="button-group">
              <button type="submit" className="submit-button">Update Book</button>
              <button type="button" onClick={() => setSelectedBook(null)} className="cancel-button">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateBook;
