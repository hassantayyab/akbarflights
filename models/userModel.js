const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: Number,
  username: String,
  password: String,
  multiplier: Number
});

const User = mongoose.model('user', userSchema);

module.exports = User;
