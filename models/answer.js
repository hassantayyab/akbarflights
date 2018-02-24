const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model
const AnswerSchema = new Schema({
    ident: Number,
    num: Number,
    data1:{
      numb: Number,
      answer: String
    },
    data2:{
      numb: Number,
      answer: String
    },
    data3:{
      numb: Number,
      answer: String
    },
    data4:{
      numb: Number,
      answer: String
    }
});

const AnswerDB = mongoose.model('answerdb', AnswerSchema);

module.exports = AnswerDB;
