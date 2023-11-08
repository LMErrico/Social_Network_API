const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const thoughtsRouter = require('./routes/thoughts');
const reactionsRouter = require('./routes/reactions');

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/social_network_db', { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect('mongodb://127.0.0.1:27017/mygroceryDB');
//localhost:27017
const db = mongoose.connection  ;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
app.use('/users', usersRouter);
app.use('/thoughts', thoughtsRouter);
app.use('/reactions', reactionsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});