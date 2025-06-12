const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true 
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String
  },
  pdfUrl: {
    type : String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
