import { useEffect } from "react";
import { useState } from "react";

const WeatherCard = ({ city }) => {
  const [coordinates, setcoordinate] = useState({ lat: 0, lon: 0 });
  const apikey = "aaf70af48b54e21af6b54415f9221d0a";
  const get_coordinates = async (city) => {
    const apiurl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`;
    const response = await fetch(apiurl);
    if (!response.ok) {
      throw new Error("coordinates could not  be fetched");
    }
    const data = await response.json();
    if (data.length === 0) {
      throw new Error("city is not available");
    }
    setcoordinate({ lat: data[0].lat, lon: data[0].lat });
  };

  return <div className="weather_template"></div>;
};
export default WeatherCard;
