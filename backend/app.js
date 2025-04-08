const express = require('express');
const dotenv = require('dotenv');
//dotenv.config();
require('dotenv').config();
const connectDB = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
connectDB();
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Route for the root URL
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the React Project Backend!</h1><p>Everything is running smoothly...</p>');
});

module.exports = app; // Export the app instance