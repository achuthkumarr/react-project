const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./Models/db');
// Import routes
const authRoutes = require('./Routers/AuthRouter');
const userRoutes = require('./Routers/UserRouter');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express app
const app = express();

// Define CORS options
const corsOptions = {
  origin: ['http://localhost:5174','http://localhost:5173'],
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions)); // Use the configured corsOptions
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Route for the root URL
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the React Project Backend!</h1><p>Everything is running smoothly...</p>');
});

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

module.exports = app; // Export the app instance