const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    newsTitle: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
      },
  }, {
    timestamps: true, 
  });
  const newsModel = mongoose.model('news', newsSchema);
  module.exports = newsModel;