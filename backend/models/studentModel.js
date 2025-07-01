const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    // trim: true,
  },
  email:{
     type: String,
    unique:true,
  },
  contact: {
    type: String,
    match: /^[0-9]{10}$/,
  },
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },
  fname: {
    type: String,
    trim: true,
  },
  mname: {
    type: String,
    trim: true,
  },
  branch: {
    type: String,
  },
  year: {
    type: String,
  },
  program: {
    type: String,
  },
  password: {
    type: String,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  paymentAmount: {
    type: Number,
  },
  paymentDate: {
    type: Date,
  },
}, {
  timestamps: true
});

const studentModal = mongoose.model('student', studentSchema);
module.exports = studentModal;
