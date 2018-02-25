const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const coursesRoutes = require('./routes/courses-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

// set up express app
const app = express();

// set view engine
app.set('view engine', 'js');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// connect to mongoDB
mongoose
  .connect('mongodb://localhost/grader', {
    useMongoClient: true
    /* other options */
  })
  .then(() => console.log('connected to MongoDB...'))
  .catch(err => console.log(err));
//mongoose.connect(keys.mongodb.dbURI, () => {
//console.log('');
//});

app.use(express.static('public'));

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// initialize api route
app.use('/api', require('./routes/api'));
app.use('/auth', authRoutes);
//app.use('/courses', coursesRoutes);

// error handling middleWare
app.use(function(err, req, res, next) {
  //console.log('err');
  res.status(422).send({ error: err.message });
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// listen to requests
const PORT = process.env.PORT || 1234;
app.listen(PORT, function() {
  console.log('Listening on port 1234');
});
