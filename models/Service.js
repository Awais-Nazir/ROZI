const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Electrician',
      'Plumber',
      'Mechanic',
      'Painter',
      'Gardening',
      'Cooking',
      'Teaching',
      'Cleaning',
      'IT Support',
      'Babysitting',
      'Other',
    ],
  },
  // profilePicture: {
  //   type: String, // Path to the uploaded image
  //   default: null,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Service', ServiceSchema);
