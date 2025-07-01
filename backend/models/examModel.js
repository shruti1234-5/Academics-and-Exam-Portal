const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      desc: String,
      duration: {
        type: String,
        default: 10
      },
  questions: [
    {
        question:{
            type: String,
            required: true
            },
        choices: {
             type: [String],
             required: true,
             validate: {
                 validator:(v) => { 
                    return v.length>=2 && v.every(c=>c.trim().length>0) },
             message:'Each question must have atleast 2 non-empty choices'
           },
        },
           correct: {
            type: String,
             
        },
    }],
    status:{
        type: String,
        default:"Deactive"
    }
},{
    timestamps:true
})
module.exports = mongoose.model('exam', examSchema);
