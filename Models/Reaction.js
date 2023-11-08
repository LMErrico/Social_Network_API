const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionBody: { type: String, required: true },
  username: { type: String, required: true }
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;