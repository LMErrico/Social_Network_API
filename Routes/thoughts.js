const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');

// Get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions');
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new thought
router.post('/', async (req, res) => {
  const thought = new Thought({
    thoughtText: req.body.thoughtText,
    username: req.body.username
    // Add other thought properties as needed
  });

  try {
    const newThought = await thought.save();
    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:thoughtId', async (req, res) => {
  try {
    const { thoughtText } = req.body; // Assuming the request body contains the updated thought text

    // Find the thought by its ID and update its information
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { thoughtText },
      { new: true } // To return the updated thought
    );

    if (updatedThought) {
      res.json(updatedThought);
    } else {
      res.status(404).json({ error: 'Thought not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update the thought.' });
  }
});

router.delete('/:thoughtId', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (deletedThought) {
      res.json({ message: 'Thought deleted successfully' });
    } else {
      res.status(404).json({ error: 'Thought not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the thought.' });
  }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;

    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    // Find the index of the reaction within the array
    const reactionIndex = thought.reactions.findIndex(reaction => reaction._id.toString() === reactionId);

    if (reactionIndex === -1) {
      return res.status(404).json({ error: 'Reaction not found' });
    }

    // Remove the reaction from the array
    thought.reactions.splice(reactionIndex, 1);
    await thought.save();

    res.json({ message: 'Reaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the reaction.' });
  }
}); 


module.exports = router;