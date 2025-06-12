const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'pdf', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, author, description, price } = req.body;
    const imageUrl = req.files.image ? `/uploads/${req.files.image[0].filename}` : '';
    const pdfUrl = req.files.pdf ? `/uploads/${req.files.pdf[0].filename}` : '';

    const newBook = new Book({
      title,
      author,
      description,
      price,
      imageUrl,
      pdfUrl,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// READ all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'pdf', maxCount: 1 },
]), async (req, res) => {
  try {
    const updates = {
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
    };

    // Add uploaded file paths if present
    if (req.files.image) {
      updates.imageUrl = `/uploads/${req.files.image[0].filename}`;
    }
    if (req.files.pdf) {
      updates.pdfUrl = `/uploads/${req.files.pdf[0].filename}`;
    }

    const updated = await Book.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updated) return res.status(404).json({ error: 'Book not found' });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/books/search?title=someTitle
router.get('/search', async (req, res) => {
  const { title } = req.query;
  try {
    const books = await Book.find({
      title: { $regex: new RegExp(title, 'i') } // case-insensitive search
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});


router.get('/:id/download', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || !book.pdfUrl) {
      return res.status(404).json({ error: 'Book or PDF not found' });
    }

    const pdfPath = path.join(__dirname, '..', book.pdfUrl);

    // Set headers for file download
    res.download(pdfPath, `${book.title}.pdf`, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error downloading file');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
