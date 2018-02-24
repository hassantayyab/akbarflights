const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model
const CommentsSchema = new Schema({
  ident: Number,
  comments1: Array,
  comments2: Array,
  comments3: Array,
  comments4: Array,
});

const CommentsDB = mongoose.model('commentsdb', CommentsSchema);

module.exports = CommentsDB;
