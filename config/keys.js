// choose to return either production or development keys
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dev_keys');
} else {
  module.exports = require('./dev_keys');
}