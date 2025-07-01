const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
  studentId: {
        type: String,
        require: true,
        ref:'student',
    },
    subject:String,
    type:String,
    message:String
  }, {
    timestamps: true, 
  });
  const feedbackModel = mongoose.model('feedback', feedbackSchema);
  module.exports = feedbackModel;