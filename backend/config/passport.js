// load modules and libraries
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// import User model
const User = require('../models/user');
// link to database config file
const dbconfig = require('../config/database');

// main function
module.exports = function(passport){
  // set options
  const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeader(),
    secretOrKey : dbconfig.secret
  }

  // send strategy which uses options and returns payload
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // use payload's user ID to find user in database, returns user or error
    User.getUserById(jwt_payload._doc._id, (err, user) => {
      if (err) {
        // if error exists, return error via done callback
        return done(err, false);
      }

      if (user) {
        // if user exists, return no error, and send user via done callback
        return done(null, user);
      } else {
        // if no user found, return no error or user
        return done(null, false);
      }
    });
  }));
}
