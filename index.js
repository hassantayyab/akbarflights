const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth-routes');
const coursesRoutes = require('./routes/courses-routes');
require('./config/passport-setup');
const keys = require('./config/keys');

// set up express app
const app = express();

// set view engine
app.set('view engine', 'jsx');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// connect to mongoDB
mongoose
  .connect(keys.mongodb.mLabURI, {
    useMongoClient: true
    /* other options */
  })
  .then(() => console.log('connected to MongoDB...'))
  .catch((err) => console.log(err));
// Use following to use local mongodb Database
//mongoose.connect(keys.mongodb.dbURI, () => {
//console.log('');
//});
// and following for mLab
//mongoose.connect(keys.mongodb.mLabURI, () => {
//console.log('');
//});

app.use(express.static('public'));

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up session cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// initialize routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
// app.use('/', coursesRoutes);

// error handling middleWare
// app.use(function(err, req, res, next) {
//   //console.log('err');
//   res.status(422).send({ error: err.message });
// });

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// listen to requests
const PORT = process.env.PORT || 1234;
app.listen(PORT, function() {
  console.log('Listening on port 1234');
});
