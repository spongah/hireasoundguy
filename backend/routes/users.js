// load modules and libraries
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

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
      res.json({ success: false, msg: 'Failed to register user' });
    } else {
      res.json({ success: true, msg: 'User registered!' });
    }
  });
});

// find user by username and return user if found, or error msg if not
router.post('/findbyusername', (req, res, next) => {
  if (!req.body.username) {
    res.json({ success: false, message: 'No Username Specified!' });
  } else {
    User.getUserByUsername(req.body.username, (err, user) => {
      if (user) {
        res.json(user);
      } else {
        let message = 'Username: \'' + req.body.username + '\' not found!';
        res.json({ success: false, message: message });
      }
    });
  }
});

// authenticate searches for a user that matches the provided username
// if a user is returned, comparePassword is called with params below:
// typed password from request body is first param
// returned user.password from database (hash) is second param
// third is a callback that either sends an error or a match boolean
//
// if isMatch is returned true, a token is created by jwt.sign
// first parameter is payload (user object), second is privateKey
// third parameter is options, includes expiresIn
//
// finally, the method responds with a json success message including
// token and user info, unless !isMatch then it says "Incorrect PW!"

router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user, dbconfig.secret, {
          expiresIn : 604800  // 1 week in seconds?
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({
          success: false,
          msg: "Incorrect password!"
        });
      }
    });
  });
});

// profile's second parameter confirms the passport token before displaying this
router.get('/profile', passport.authenticate('jwt', { session: false })
, (req, res, next) => {
  res.json({ user : req.user });
});

// EXPORT ROUTES
module.exports = router;
