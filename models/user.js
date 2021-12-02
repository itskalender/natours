const mongoose    = require('mongoose');
const { isEmail } = require('validator');
const bcyrpt      = require('bcryptjs');

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
    validate  : {
      validator: function checkPasswordEquality(passwordConfirm) {
        return this.password === passwordConfirm;
      },
      message : 'Please provide a password that is equal to the former.'
    }
  },
  photo: {
    type      : String,
  }
});

userSchema.pre('save', async function hashPassword(next) {
  // Error Handling?
  if (this.isModified) {
    this.password         = await bcyrpt.hash(this.password, 12);  
    this.passwordConfirm  = undefined;
  }

  next();
});

userSchema.methods.comparePasswords = async function(password, hash) {
  return await bcyrpt.compare(password, hash);
}

const User = mongoose.model('User', userSchema);

module.exports = User;