const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

router.get('/', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is missing.' });
  }

  try {
    const apiResponse = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    const { main, weather, wind } = apiResponse.data;

    const formattedData = {
      temperature: main?.temp,
      condition: weather?.[0]?.description,
      icon: weather?.[0]?.icon,
      humidity: main?.humidity,
      windSpeed: wind?.speed,
    };

    if (!formattedData.temperature || !formattedData.condition) {
      return res.status(500).json({ error: 'Weather information is incomplete.' });
    }

    res.json(formattedData);
  } catch (err) {
    console.error('API Fetch Error:', err.message);

    if (err.response) {
      return res.status(err.response.status).json({
        error: err.response.data?.message || 'Failed to fetch weather details from server.',
      });
    }

    if (err.request) {
      return res.status(502).json({ error: 'No response received from weather service.' });
    }

    return res.status(500).json({ error: 'Unexpected error occurred on the server.' });
  }
});

module.exports = router;
