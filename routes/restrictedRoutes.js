const keys = require('../config/keys');
const router = require('express').Router();

const authCheck = (req, res, next) => {
  // console.log('req: ', req);
  if (!req.user) {
    res.redirect('/login');
  }
  next();
};

router.get('/courses', authCheck, (req, res, next) => {
  next();
});

router.get('/assignments:n', authCheck, (req, res, next) => {
  next();
});

router.get('/app:n', authCheck, (req, res, next) => {
  // res.redirect('/assignments/'+req.params.n);
  next();
});

module.exports = router;