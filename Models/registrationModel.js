const mongoose = require('mongoose');
const validator = require('validator');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A registration must have a name'],
  },

  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },

  email: {
    type: String,
    required: [true, 'A registration must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
});

const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;
