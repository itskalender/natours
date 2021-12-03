const crypto       = require('crypto')
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
  role: {
    type      : String,
    default   : 'user',
    enum      : {
      values: ['user', 'guide', 'lead-guide', 'admin'],
      message: 'A user\'s role must be either user, guide, lead-guide or admin.'
    }
  },
  password: {
    type      : String,
    required  : [true, 'A user must have a password.'],
    minlength : [8, 'A user\'s password has to be at least 8 characters long.'],
    select    : false
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpiresAt: Date,
  photo: {
    type      : String,
  }
});

userSchema.pre('save', async function hashPassword(next) {
  const isPasswordChanged = this.isModified('password');

  if (isPasswordChanged) {
    this.password = await bcyrpt.hash(this.password, 12);  
  }

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.comparePasswords = async function(password, hash) {
  return await bcyrpt.compare(password, hash);
}

userSchema.methods.isPasswordChangedAfterJWT = function(tokenTimestamp) {
  if (this.passwordChangedAt) {
    const passwordTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return passwordTimestamp > tokenTimestamp;
  }

  return false;
}

userSchema.methods.getPasswordResetTokenForEmail = function() {
  const passwordResetTokenForEmail = crypto.randomBytes(32).toString('hex');

  const passwordResetTokenForDB = crypto
    .createHash('sha256')
    .update(passwordResetTokenForEmail)
    .digest('hex');

  this.passwordResetToken           = passwordResetTokenForDB;
  this.passwordResetTokenExpiresAt  = Date.now() + 10 * 60 * 1000;

  return passwordResetTokenForEmail;
}

const User = mongoose.model('User', userSchema);

module.exports = User;