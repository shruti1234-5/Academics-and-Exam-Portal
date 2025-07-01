const mongoose = require('mongoose')

const programSchema = new mongoose.Schema({
    program: {
      type: String,
      required: true,
      unique: true,
    },
  }, {
    timestamps: true, 
  });
  const programModel = mongoose.model('program', programSchema);
  module.exports = programModel;