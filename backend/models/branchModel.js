const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
    branch: {
      type: String,
      required: true,
      unique: true,
    },
  }, {
    timestamps: true, 
  });
  const branchModel = mongoose.model('branch', branchSchema);
  module.exports = branchModel;