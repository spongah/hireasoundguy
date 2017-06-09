// load modules and libraries
const mongoose = require('mongoose');

// user schema
const UserSchema = mongoose.Schema({
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

module.exports.getAllUsers = function(callback) {
  User.find(callback);
}
