// load modules and libraries
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

// link to database config file
const dbconfig = require('./config/database');
// link to routes files
const users = require('./routes/users');

// set port number
const port = process.env.PORT || 8080;

// create express app
const app = express();

// activate various middleware
app.use(cors());  // allows cross origin access
app.use(bodyParser.json()); // parses form data to req.body
app.use(passport.initialize());
app.use(passport.session());
// runs function in passport.js and passes passport object to said function
require('./config/passport')(passport);

// set root web folder to "/public"
app.use(express.static(path.join(__dirname, 'public')));

// MAIN ROUTES
app.use('/users', users);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// CONNECT TO DB, IF SUCCESSFUL START SERVER
mongoose.connect(dbconfig.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + dbconfig.database);
  // CONNECTED, START SERVER
  app.listen(port, () => {
    console.log('Server started on port ' + port);
  });
});

mongoose.connection.on('error', (err) => {
  // CONNECTION FAILED, LOG ERROR TO CONSOLE
  // console.log('Server not started.');
  console.log('Database error: ' + err);
  app.listen(port, () => {
    console.log('Server started on port ' + port);
  });
});
