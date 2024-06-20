import { useState } from "react";
import WeatherCard from "./Components/Weather_Card";
function App() {
  const [city, setcity] = useState("");
  const getcity = (e) => {
    e.preventDefault();
    const new_city = e.target.city.value;
    setcity(new_city);
  };

  return (
    <div>
      <p1>Weather.io</p1>
      <form onSubmit={getcity}>
        <input type="text" id="city" name="city" />
        <button type="submit">Get Weather</button>
      </form>
      {city && <WeatherCard city={city} />}
    </div>
  );
}
export default App;
