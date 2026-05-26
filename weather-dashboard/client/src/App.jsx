import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to request weather info from the server
  const fetchWeatherData = async (city) => {
    setLoading(true);      // Show loading state
    setError(null);        // Reset any prior errors

    try {
      const response = await axios.get(`https://weather-dashboard-hjx9.onrender.com/weather?city=${city}`, {

        headers: {
          'Cache-Control': 'no-cache', // Prevent caching during development
        },
      });

      console.log('Received Weather Info:', response.data); // Output API response
      setWeatherData(response.data);  // Save weather details to state
    } catch (err) {
      console.error('Failed to retrieve weather data:', err); // Show in console
      setError('Unable to retrieve weather info at the moment. Please retry.');
    } finally {
      setLoading(false);   // Hide loading regardless of success or failure
    }
  };

  // Create a dynamic class for background styling based on weather condition
  const dynamicClass = weatherData
    ? weatherData.condition.replace(/\s+/g, '-').toLowerCase()
    : '';

  return (
    <div className={`container ${dynamicClass}`}>
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeatherData} />
      {loading && <div>Loading weather data...</div>}
      <WeatherCard weatherData={weatherData} error={error} />
    </div>
  );
};

export default App;
