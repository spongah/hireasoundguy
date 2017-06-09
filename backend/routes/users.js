// load modules and libraries
const express = require('express');

// link to database config file
const dbconfig = require('../config/database');

// import User model
const User = require('../models/user');

// create router
const router = express.Router();

// USER ROUTES
router.get('/test', (req, res, next) => {
  res.json({ success: true });
});

router.get('/all', (req, res, next) => {
  User.getAllUsers((err, users) => {
    res.json(users);
  });
});

// EXPORT ROUTES
module.exports = router;
