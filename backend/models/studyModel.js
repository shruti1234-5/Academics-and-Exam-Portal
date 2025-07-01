const mongoose = require('mongoose')

const studySchema = new mongoose.Schema({
    topic: {
      type: String,
     },
    description: {
        type: String,
       },
      doc:{
        type: String,
      },
      status:{
        type: String,
        default: "Active",
      }
  }, {
    timestamps: true, 
  });
  const studyModel = mongoose.model('study', studySchema);
  module.exports = studyModel;