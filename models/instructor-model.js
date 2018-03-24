const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
  userType: Number,
  username: String,
  googleId: String,
  thumbnail: String
});

const Instructor = mongoose.model('instructor', instructorSchema);

module.exports = Instructor;
