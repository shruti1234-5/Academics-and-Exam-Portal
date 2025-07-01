const express = require('express');
const router = express.Router();
const Exam = require('../models/examModel');

// Create new exam with questions
router.post('/', async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.json({ msg: 'Success', exam });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get all exams
router.get('/', async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json({ msg: 'Success', "value": exams });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get single exam by ID
router.get('/:id', async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ msg: 'Exam not found' });
    }
    res.json({ msg: 'Success', exam });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Update exam
router.put('/:id', async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exam) {
      return res.status(404).json({ msg: 'Exam not found' });
    }
    res.json({ msg: 'Success', exam });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Toggle exam status (Active/Deactive)
router.patch('/:id/status', async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ msg: 'Exam not found' });
    }
    
    exam.status = exam.status === 'Active' ? 'Deactive' : 'Active';
    await exam.save();
    
    res.json({ msg: 'Success', exam });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Delete exam
router.delete('/:id', async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) {
      return res.status(404).json({ msg: 'Exam not found' });
    }
    res.json({ msg: 'Success' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
