const mongoose    = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type      : String,
    required  : [true, 'A user must have a name.'],
    trim      : true,
    minlength : [2, 'A user\'s name must be at least 2 charecters.'],
    maxlength : [20, 'A user\'s name must be less than or equal to 20 characters.']
  },
  email: {
    type      : String,
    required  : [true, 'A user must have a password.'],
    unique    : true,
    lowercase : true,
    validate  : [isEmail, 'Please provide a valid email.']
  },
  password: {
    type      : String,
    required  : [true, 'A user must have a password.'],
    minlength : [8, 'A user\'s password has to be at least 8 characters long.']
  },
  passwordConfirm: {
    type      : String,
    required  : [true, 'Please confirm your password.'],
  },
  photo: {
    type      : String,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;