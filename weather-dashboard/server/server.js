// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Initialize environment variables

const weatherRoutes = require('./routes/weather');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // Handle JSON payloads

// Routing
app.use('/weather', weatherRoutes);

// Server configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Weather API server is up and running on port ${PORT}`);
});
