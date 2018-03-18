// add this file to .gitignore
// produnction keys used from heroku

module.exports = {
  google: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  },
  mongodb: {
    // dbURI: 'mongodb://localhost/grader',
    mLabURI: process.env.MLAB_URI
  },
  session: {
    cookieKey: process.env.COOKIE_KEY
  }
};
