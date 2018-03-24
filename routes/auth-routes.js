const router = require('express').Router();
const passport = require('passport');
// const instructorPassport = require('passport');

// auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
  // req.send(req.user);
});

// auth with google+
router.get(
  '/google/student',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
////////////////////////////////////////////////////////////////
router.get(
  '/google/instructor',
  passport.authenticate('google2', {
    scope: ['profile', 'email']
  })
);

// callback route for google to redirect to
// handle control to passport to use code to grab profile info
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  // res.send(req.user);
  res.redirect('/student');
  // res.render('courses', { user: req.user });
});
/////////////////////////////////////////////////////////////////
router.get('/google/callback2', passport.authenticate('google2'), (req, res) => {
  res.redirect('/instructor');
});

// auth login
router.get('/current_user', (req, res) => {
  // console.log('in router.get current_user',req);
  res.send(req.user);
});


module.exports = router;
