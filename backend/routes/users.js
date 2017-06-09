// load modules and libraries
const express = require('express');

// create router
const router = express.Router();

// USER ROUTES
router.get('/test', (req, res, next) => {
  res.json({ success: true });
});

// EXPORT ROUTES
module.exports = router;
