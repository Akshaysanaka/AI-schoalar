const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Scholarship', scholarshipSchema);
