'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {type: String, default: ''},
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  nickName: {type: String, default: ''},
  imageFile: {type: String, default: ''}
});

UserSchema.methods.serialize = function() {
  return {
    id: this._id || '',
    username: this.username || '',
    email: this.email || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    nickName: this.nickName,
    imageFile: this.imageFile
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };
