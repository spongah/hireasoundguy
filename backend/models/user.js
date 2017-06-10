// load modules and libraries
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// user schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// export User model as mongoose model object called User following UserSchema
const User = module.exports = mongoose.model('User', UserSchema);



// takes a username and uses mongoose findOne to return the user object via callback
module.exports.getAllUsers = function(callback) {
  User.find(callback);
}

// takes a User object, encrypts password with bcrypt using generated salt object
// if error is not thrown, saves with mongoose save then returns User via callback
module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

// takes a username and uses mongoose findOne to return the user object via callback
module.exports.getUserByUsername = function(usernameToFind, callback){
  const query = { username : usernameToFind };
  User.findOne(query, callback);
}

// takes typed password, hashed password, uses bcrypy to compare the two
module.exports.comparePassword = function(typedPassword, storedPassword, callback) {
  bcrypt.compare(typedPassword, storedPassword, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}
