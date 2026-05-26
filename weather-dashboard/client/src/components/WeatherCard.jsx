import React, { useEffect } from 'react';

const WeatherCard = ({ weatherData, error }) => {
  useEffect(() => {
    console.log("WeatherCard updated:", weatherData, error);
  }, [weatherData, error]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Please enter a city to view the weather report.</div>;
  }

  const { temperature, condition, icon, humidity, windSpeed } = weatherData;
  const iconLink = icon ? `http://openweathermap.org/img/wn/${icon}@2x.png` : '';

  return (
    <div className="weather-card">
      <h2>Today's Forecast</h2>
      <p><strong>Temperature:</strong> {temperature}°C</p>
      <p><strong>Condition:</strong> {condition}</p>
      {icon && <img src={iconLink} alt="Weather condition icon" />}
      <p><strong>Humidity:</strong> {humidity}%</p>
      <p><strong>Wind:</strong> {windSpeed} m/s</p>
    </div>
  );
};

export default WeatherCard;
