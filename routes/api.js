const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const PythonShell = require('python-shell');

// fetch User
router.get('/user', (req, res, next) => {
  User.findOne({ id: 1 })  
    .then((data) => {
      // console.log('USER:', data);
      res.send(data);
    })
    .catch((err) => {
      console.log('ERROR IN API USER:', err);
    });
});
// add new user
router.post('/user', (req, res, next) => {
  // console.log('in user router.post:',req.body)
  User.update(
    { id: 1 },
    {
      username: req.body[0],
      password: req.body[1],
      multiplier: Number(req.body[2])
    },
    { upsert: true }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log('ERROR in User api POST:', err);
    });
});

// get results
router.get('/submit/:n', (req, res) => {
  // console.log(req.params.n);
  var pyshell = new PythonShell('akbartravels.py');
  pyshell.send(JSON.stringify(req.params.n));
  // pyshell.send(req.params.n);
  pyshell.on('message', (message) => {
    // received a message sent from the Python script (a simple "print" statement)
    console.log('message:', message);
    res.send(message);
  });
  // end the input stream and allow the process to exit
  pyshell.end((err) => {
    if (err) {
      console.log('ERROR in pyshell.end:', err)
    };
    console.log('finished');
  });
});

module.exports = router;
