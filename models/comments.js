const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model
const CommentsSchema = new Schema({
  id: Number,
  data: [
    {
      num: Number,
      comments: Array
    }
  ]
});

const CommentsDB = mongoose.model('commentsdb', CommentsSchema);

module.exports = CommentsDB;
