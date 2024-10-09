import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Importing the stylesheet for styling the UI

function App() {
  // State variables to store weather data, city input, loading state, error messages, units, and toggle state
  const [weatherData, setWeatherData] = useState(null);  // Holds the weather data returned from the API
  const [city, setCity] = useState("");  // Tracks the user's input for city name
  const [loading, setLoading] = useState(false);  // Shows a loading message while data is being fetched
  const [error, setError] = useState(null);  // Stores any error messages
  const [unit, setUnit] = useState("metric");  // Stores the unit for temperature: "metric" (Celsius) or "imperial" (Fahrenheit)
  const [isCelsius, setIsCelsius] = useState(true);  // Tracks if the temperature unit is Celsius (true) or Fahrenheit (false)

  // OpenWeather API key and base URL for fetching weather data
  const apiKey = "ac85a7373a70c9cb7081dc18145573a8";  // Replace this with your OpenWeather API key

  // Function to fetch weather data for the entered city
  const fetchWeather = async (cityName) => {
    setLoading(true);  // Start the loading state
    setError(null);  // Reset any previous errors
    try {
      // Making the API request with the city name and the unit (metric or imperial)
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`
      );
      setWeatherData(response.data);  // Store the returned weather data in state
      setLoading(false);  // End the loading state
    } catch (err) {
      setError("City not found or other error.");  // Set an error message if the city is not found or API request fails
      setLoading(false);  // End the loading state
    }
  };

  // Function to update the city state based on user input in the text field
  const handleCityChange = (e) => {
    setCity(e.target.value);  // Update city value with what's typed by the user
  };

  // Function to trigger weather data fetching when the "Search" button is clicked
  const handleSearch = () => {
    if (city.trim()) {  // Ensure the city input is not empty or just spaces
      fetchWeather(city);  // Fetch weather data for the entered city
    }
  };

  // Function to toggle between Celsius and Fahrenheit
  const toggleUnits = () => {
    if (isCelsius) {
      setUnit("imperial");  // Switch to imperial (Fahrenheit)
    } else {
      setUnit("metric");  // Switch back to metric (Celsius)
    }
    setIsCelsius(!isCelsius);  // Toggle the Celsius/Fahrenheit state
    if (city) {
      fetchWeather(city);  // Re-fetch the weather data with the new unit after toggling
    }
  };

  return (
    <div className="App">  {/* Main container for the entire UI */}
      <div className='container'>  {/* Wrapper for the content */}
        <div className='left-side'>  {/* Left side of the UI where inputs and weather details are shown */}
          <div>
            {/* Input field to enter the city name */}
            <input
              type="text"
              value={city}
              onChange={handleCityChange}  // Update the city state as the user types
              placeholder="Enter city name"
            />
            {/* Search button to trigger the weather API call */}
            <button onClick={handleSearch}>Search</button>

            {/* Loading indicator shown while the weather data is being fetched */}
            {loading && <div>Loading...</div>}

            {/* Error message shown if the city is not found or other issues occur */}
            {error && <div>{error}</div>}

            {/* Display weather data if it's available, and not in a loading or error state */}
            {weatherData && !loading && !error && (
              <div>
                {/* Display the name of the city */}
                <h2>{weatherData.name}</h2>
                {/* Display the current temperature with the correct unit */}
                <p>Temperature: {weatherData.main.temp}°{isCelsius ? 'C' : 'F'}</p>
                {/* Display the weather description, e.g., "clear sky", "rain", etc. */}
                <p>Weather: {weatherData.weather[0].description}</p>
                {/* Display the current humidity level */}
                <p>Humidity: {weatherData.main.humidity}%</p>
                {/* Display the current wind speed */}
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                {/* Button to toggle between Celsius and Fahrenheit */}
                <button onClick={toggleUnits}>
                  {isCelsius ? 'Show in Fahrenheit' : 'Show in Celsius'}
                </button>
              </div>
            )}
          </div>
        </div>
        {/* You can add additional detailed weather info or future forecasts here */}
      </div>
    </div>
  );
}

export default App;  // Export the App component to be used in the main entry file (like index.js)
