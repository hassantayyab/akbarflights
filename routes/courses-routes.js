const router = require('express').Router();
const path = require('path');

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

router.get('*', authCheck, (req, res) => {
  //res.render('profile', { user: req.user });
  //   console.log("In courses route");
//   res.redirect('/app');
//   res.sendFile(path.join(__dirname + '/public/index.html'));
});

module.exports = router;
