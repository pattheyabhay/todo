// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://<pwd>@cluster0.9dgfcrj.mongodb.net/todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//code to check if connection to DB is successful or not
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});


const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  // Add more fields as needed, e.g., date, status, etc.
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({ todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

