const express = require('express');
const Scholarship = require('../models/Scholarship');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/scholarships
// @desc    Get all scholarships
// @access  Public
router.get('/', async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ createdAt: -1 });
    res.json(scholarships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/scholarships/:id
// @desc    Get scholarship by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    res.json(scholarship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/scholarships
// @desc    Create a scholarship
// @access  Private (Admin only - for now public for demo)
router.post('/', async (req, res) => {
  try {
    const { title, provider, amount, deadline, description, eligibility } = req.body;

    const scholarship = new Scholarship({
      title,
      provider,
      amount,
      deadline,
      description,
      eligibility,
    });

    await scholarship.save();
    res.json(scholarship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/scholarships/:id
// @desc    Update a scholarship
// @access  Private (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    res.json(scholarship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/scholarships/:id
// @desc    Delete a scholarship
// @access  Private (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    res.json({ message: 'Scholarship deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
