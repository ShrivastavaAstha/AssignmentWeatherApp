import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import gif from "./WeatherIcons.gif";

const Weather = ({ theme }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [currentLocationWeather, setCurrentLocationWeather] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    getCurrentLocationWeather();

    return () => clearInterval(timer);
  }, []);

  // responsible for fetching weather data from the OpenWeatherMap API.
  const fetchWeather = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  //searches for weather data by entering a city name
  const fetchWeatherByCity = async () => {
    const apiKey = "8e6bd7234d4dbd888ab541c1ff8e6607";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const data = await fetchWeather(url);
      setWeather(data);
      setError("");
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  // fetches weather data for the user's current location using the browser's geolocation API.
  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = "8e6bd7234d4dbd888ab541c1ff8e6607";
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

          try {
            const data = await fetchWeather(url);
            setCurrentLocationWeather(data);
          } catch (err) {
            console.error(
              "Error fetching weather for current location:",
              err.message
            );
          }
        },
        (error) => {
          console.error("Error getting current location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = () => {
    fetchWeatherByCity();
  };

  //returns the name of the day of the week for a given date.
  const getDayOfWeek = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  };

  const formatDateTime = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      {" "}
      <img src={gif} alt="Weather GIF" className="gif" />
      <h1
        style={{
          color: "white",
          fontFamily: "sans-serif",
          fontStyle: "oblique",
        }}
      >
        Weather App
      </h1>
      <div className={`weather-container ${theme}`}>
        {/* shows current location weather info */}
        <div className="live-info">
          {currentLocationWeather && (
            <div className={`current-location-weather ${theme}`}>
              <div className="city-name">
                <h2>{currentLocationWeather.name}</h2>
              </div>
              <br />
              <br />
              <p>
                {capitalizeFirstLetter(
                  currentLocationWeather.weather[0].description
                )}
              </p>
              <h1>{currentLocationWeather.main.temp}°C</h1>
              <p>Humidity: {currentLocationWeather.main.humidity}%</p>
              <p>Wind Speed: {currentLocationWeather.wind.speed} m/s</p>
              <h3>{dateTime.toLocaleTimeString()}</h3>
              <p>{`${getDayOfWeek(dateTime)}, ${formatDateTime(dateTime)}`}</p>
            </div>
          )}
        </div>

        {/* Contains input bar and searched location weather info */}
        <div className="search-info">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search any city"
          />
          <button onClick={handleSearch}>
            <SearchIcon />
          </button>
          {error && <p className="error">{error}</p>}
          {weather && (
            <div className={`weather-info ${theme}`}>
              <h3>{weather.name}</h3>

              <p>{capitalizeFirstLetter(weather.weather[0].description)}</p>
              <h2>{weather.main.temp}°C</h2>
              <p>Humidity : {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
              <br />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
