const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get 1 user
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the user.' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username
    // Add other user properties as needed
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:userId', async (req, res) => {
  try {
    const { thoughts, friends } = req.body;

    // Construct the update object to modify multiple fields
    const updateFields = {};
    if (thoughts) updateFields.thoughts = thoughts;
    if (friends) updateFields.friends = friends;

    // Find the user by ID and update their information
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updateFields }, // Use $set to update multiple fields
      { new: true }
    );

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update the user.' });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const deletionResult = await User.deleteOne({ _id: req.params.userId });

    if (deletionResult.deletedCount > 0) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the user.' });
  }
});




module.exports = router;