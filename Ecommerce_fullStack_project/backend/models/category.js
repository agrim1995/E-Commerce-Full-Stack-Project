const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  catName: {
    type: String,
     lowercase: true,
    required: [true, "Category Name is required"], 
    // unique: true,
    // trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Category', CategorySchema);
