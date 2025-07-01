const express = require('express');
const router = express.Router();
const examResultModel = require('../models/examResultModel');

// Save exam result
router.post('/', async (req, res) => {
  try {
    const result = await examResultModel.create(req.body);
    res.json({ msg: 'Success', result });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error - student already took this exam
      res.status(400).json({ msg: 'You have already taken this exam' });
    } else {
      res.status(500).json({ msg: error.message });
    }
  }
});

// Get all exam results for a student
router.get('/student/:studentId', async (req, res) => {
  try {
    const results = await examResultModel.find({ studentId: req.params.studentId });
    res.json({ msg: 'Success', results });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get specific exam result for a student
router.get('/student/:studentId/exam/:examId', async (req, res) => {
  try {
    const result = await examResultModel.findOne({
      studentId: req.params.studentId,
      examId: req.params.examId
    });
    
    if (!result) {
      return res.status(404).json({ msg: 'No result found for this exam' });
    }
    
    res.json({ msg: 'Success', result });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get all exam results (admin view)
router.get('/', async (req, res) => {
  try {
    const results = await examResultModel.find().populate('examId', 'name');
    res.json({ msg: 'Success', results });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router; 