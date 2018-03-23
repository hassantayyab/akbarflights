const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model
const AnswerSchema = new Schema({
  id: Number,
  data: [
    {
      num: Number,
      count: Number,
      answer: String
    }
  ]
});

// mujhy woh wale array mein se dictionary do jis mein
// given num value hai

const AnswerDB = mongoose.model('answerdb', AnswerSchema);

module.exports = AnswerDB;
