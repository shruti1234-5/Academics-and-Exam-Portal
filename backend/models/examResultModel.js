const mongoose = require('mongoose');

const examResultSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    ref: 'student'
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'exam'
  },
  examName: {
    type: String,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  answeredQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  timeTaken: {
    type: Number, // in seconds
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate submissions
examResultSchema.index({ studentId: 1, examId: 1 }, { unique: true });

const examResultModel = mongoose.model('examResult', examResultSchema);
module.exports = examResultModel; 