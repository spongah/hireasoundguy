// load modules and libraries
const express = require('express');
const path = require('path');

// link to routes files
const users = require('./routes/users');

// set port number
const port = process.env.PORT || 8080;

// create express app
const app = express();

// set root web folder to "/public"
app.use(express.static(path.join(__dirname, 'public')));

// MAIN ROUTES
app.use('/users', users);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// START SERVER
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
