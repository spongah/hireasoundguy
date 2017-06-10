// load modules and libraries
const express = require('express');

// link to database config file
const dbconfig = require('../config/database');

// import User model
const User = require('../models/user');

// create router
const router = express.Router();

// USER ROUTES

router.get('/all', (req, res, next) => {
  User.getAllUsers((err, users) => {
    res.json(users);
  })
});

router.post('/findbyusername', (req, res, next) => {
  if (!req.body.username) {
    res.json({"success": "false", "message": "No Username Specified!"});
  } else {
    User.getUserByUsername(req.body.username, (err, user) => {
      if (user) {
        res.json(user);
      } else {
        let message = "Username: \'" + req.body.username + "\' not found!";
        res.json({"success": "false", "message": message});
      }
    });
  }
});

// register creates newUser from body parser then calls User's addUser
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered!'});
    }
  });
});

// EXPORT ROUTES
module.exports = router;
