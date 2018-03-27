const passport = require('passport');
// const instructorPassport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const GoogleStrategy2 = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');
const Instructor = require('../models/instructor-model');

passport.serializeUser((user, done) => {
  // console.log('in serializeUser:', user.id);
  // done(null, user.id);

  var key;
  if (user instanceof User) {
    key = {
      id: user.id,
      type: 1
    }
  } else if (user instanceof Instructor) {
      key = {
        id: user.id,
        type: 2
      }
    }
  done(null, key);

  // if (Instructor.findById(user.id)) {
  //   done(null, user.id);
  // }
  // else if (User.findById(user.id)) {
  //   done(null, user.id);
  // }
});

passport.deserializeUser((key, done) => {
  // console.log('in deserializeUser:', id);
  // User.findById(id).then(user => {
  //   done(null, user);
  // });

  if (key.type === 1) {
    User.findById(key.id, function (err, user) {
      done(err, user);
    });
    } else if (key.type === 2) {
      Instructor.findById(key.id, function (err, user) {
        done(err, user);
      });
    }
});

  // if (key.type === 0) {
  //   User.findById(key.id, function (err, user) {
  //     done(err, user);
  //   });
  //   } else if (key.type === 1) {
  //     Instructor.findById(key.id, function (err, user) {
  //       done(err, user);
  //     });
  //   }

  // console.log('user.find:', User.findById(id));
  

  // if (User.findOne({googleId: })) {
  //   console.log('in if')
  //   User.findById(id).then(user => {
  //     done(null, user);
  //   });
  // }
  // else if (Instructor.findById(id)) {
  //   console.log('in elseif')
  //   Instructor.findById(id).then(user => {
  //     done(null, user);
  //   });
  // }
  // 5ab6860b4ea1ad26bcb7e3c1
////////////////////////////////////////////////////////////////////
// passport.serializeUser((instructor, done) => {
//   done(null, instructor.id);
// });

// passport.deserializeUser((id, done) => {
//   Instructor.findById(id).then(instructor => {
//     done(null, instructor);
//   });
// });

passport.use('google',
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      // console.log('req:', req);  
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // already have this user
          // console.log('user is: ', existingUser);
          done(null, existingUser);
        } else {
          // if not, create user in our db
          new User({
            userType: 0,
            googleId: profile.id,
            username: profile.displayName,
            thumbnail: profile._json.image.url
          })
            .save()
            .then(newUser => {
              // console.log('created new user: ', newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
/////////////////////////////////////////////////////////////////////////////
passport.use('google2',
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/callback2'
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      // console.log('req:', req);  
      Instructor.findOne({ googleId: profile.id }).then(existingInstructor => {
        if (existingInstructor) {
          // already have this user
          // console.log('user is: ', existingInstructor);
          done(null, existingInstructor);
        } else {
          // if not, create instructor in our db
          new Instructor({
            userType: 1,
            googleId: profile.id,
            username: profile.displayName,
            thumbnail: profile._json.image.url
          })
            .save()
            .then(newInstructor => {
              // console.log('created new Instructor: ', newInstructor);
              done(null, newInstructor);
            });
        }
      });
    }
  )
);
