const router = require('express').Router();
var path = require('path');

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/');
    }
};

router.get('/', authCheck, (req, res) => {
    //res.render('profile', { user: req.user });
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

module.exports = router;
