const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model
const CoursesSchema = new Schema({
  id: Number,
  data: [
    {
      num: String,
      courses: Array
    }
  ]
});

const CoursesDB = mongoose.model('coursesdb', CoursesSchema);

module.exports = CoursesDB;
