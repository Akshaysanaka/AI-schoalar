const express = require('express');
const Application = require('../models/Application');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/applications
// @desc    Get user's applications
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/applications
// @desc    Create a new application
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { scholarshipId, scholarshipTitle, deadline } = req.body;

    const application = new Application({
      userId: req.user.id,
      scholarshipId,
      scholarshipTitle,
      deadline,
    });

    await application.save();
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/applications/:id
// @desc    Update application status
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user owns the application
    if (application.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/applications/:id
// @desc    Delete an application
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user owns the application
    if (application.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
