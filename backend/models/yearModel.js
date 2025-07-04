const mongoose = require('mongoose')

const yearSchema = new mongoose.Schema({
    year: {
      type: String,
      required: true,
      unique: true,
    },
  }, {
    timestamps: true, 
  });
  const yearModel = mongoose.model('year', yearSchema);
  module.exports = yearModel;