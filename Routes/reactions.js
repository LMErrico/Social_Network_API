const express = require('express');
const router = express.Router();
const Reaction = require('../models/Reaction');
const Thought = require('../models/Thought');

// Create a new reaction for a thought
router.post('/:thoughtId', async (req, res) => {
  const thoughtId = req.params.thoughtId;
  const reaction = new Reaction({
    reactionBody: req.body.reactionBody,
    username: req.body.username
  });

  try {
    const savedReaction = await reaction.save();
    const thought = await Thought.findById(thoughtId);

    thought.reactions.push(savedReaction._id);
    await thought.save();

    res.status(201).json(savedReaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




module.exports = router;