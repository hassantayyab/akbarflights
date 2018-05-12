const express =    require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path =       require('path');
const apiRoutes =  require('./routes/api');
const keys = require('./config/keys');
// set up express app
const app = express();

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// connect to mongoDB
mongoose.connect(keys.mongodb.dbURI, {
  useMongoClient: true
  /* other options */
})
  .then(() => console.log('connected to MongoDB...'))
  .catch((err) => console.log(err));
// for local mongoDB: keys.mongodb.dbURI
// for online mongoDB: keys.mongodb.mLabURI

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// initialize routes
app.use('/api', apiRoutes);

app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
// listen to requests
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log('Listening on port 1234');
});
