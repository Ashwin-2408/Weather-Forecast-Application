
import React, { useState, useEffect } from "react";

const WeatherCard = ({ city }) => {
  const [state, setState] = useState({
    temp: 0,
    type: "",
    description: "",
    feelslike: 0,
  });
  const [coord, setCoord] = useState({ lat: 0, lon: 0 });
  const [error, setError] = useState(null);
  const apikey = "aaf70af48b54e21af6b54415f9221d0a";

  const getCoordinates = async (city) => {
    try {
      const apiurl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`;
      const response = await fetch(apiurl);
      if (!response.ok) {
        throw new Error("Could not fetch coordinates");
      }
      const data = await response.json();
      if (data.length === 0) {
        throw new Error("City not found");
      }
      const { lat, lon } = data[0];
      setCoord({ lat, lon });
    } catch (error) {
      setError(error.message);
    }
  };

  const getWeather = async (lat, lon) => {
    try {
      const apiurl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
      const response = await fetch(apiurl);
      if (!response.ok) {
        throw new Error("Could not fetch weather data");
      }
      const data = await response.json();
      setState({
        temp: data.main.temp,
        type: data.weather[0].main,
        description: data.weather[0].description,
        feelslike: data.main.feels_like,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (city) {
      getCoordinates(city);
    }
  }, [city]);

  useEffect(() => {
    if (coord.lat !== 0 && coord.lon !== 0) {
      getWeather(coord.lat, coord.lon);
    }
  }, [coord]);

  return (
    <div className="card-template">
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h2>Weather in {city}</h2>
          <p>Temperature: {state.temp} °C</p>
          <p>Type: {state.type}</p>
          <p>Description: {state.description}</p>
          <p>Feels Like: {state.feelslike} °C</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;