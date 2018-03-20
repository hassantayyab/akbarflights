const router = require('express').Router();
const passport = require('passport');

// auth login
// router.get('/login', (req, res) => {
//   res.render('login', { user: req.user });
// });

// auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
  // req.send(req.user);
});

// auth with google+
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// callback route for google to redirect to
// handle control to passport to use code to grab profile info
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  // res.send(req.user);
  res.redirect('/courses');
  // res.render('courses', { user: req.user });
});

// auth login
router.get('/current_user', (req, res) => {
  // console.log('in .get current_user');
  res.send(req.user);
});

module.exports = router;
