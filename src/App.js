// App.js
import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");          // Holds the search input
  const [weatherData, setWeatherData] = useState(null);  // Holds weather data
  const [error, setError] = useState("");         // Holds any error messages

  // Predefined coordinates for a few cities
  const getCoordinates = (cityName) => {
    const cityCoordinates = {
      "New York": { latitude: 40.7128, longitude: -74.006 },
      "London": { latitude: 51.5074, longitude: -0.1278 },
      "Paris": { latitude: 48.8566, longitude: 2.3522 },
      "Tokyo": { latitude: 35.6895, longitude: 139.6917 },
      // Add more cities as needed
    };
    return cityCoordinates[cityName];
  };

  // Function to fetch weather data based on city
  const fetchWeather = async () => {
    setError("");  // Reset error message

    // Get coordinates for the entered city
    const coordinates = getCoordinates(city);
    if (!coordinates) {
      setError("City not found. Please try another city.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current_weather=true`
      );
      const data = await response.json();
      setWeatherData(data.current_weather);  // Store weather data
    } catch (err) {
      setError("Error fetching weather data. Please try again.");
    }
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    } else {
      setError("Please enter a city name.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Weather Now</h1>
      
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Enter city name..."
          className="p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      
      {error && <p className="text-red-500">{error}</p>}
      
      {weatherData && (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Current Weather in {city}</h2>
          <p className="text-gray-700">Temperature: {weatherData.temperature}°C</p>
          <p className="text-gray-700">Wind Speed: {weatherData.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;
