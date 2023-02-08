import { useState, useEffect } from "react";
import axios from "axios";
import Languages from "./Languages";

const Country = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    if(country.capital !== undefined){
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then((response) => {
        setWeather(response.data)
      })
    }
    else {
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then((response) => {
        setWeather(response.data)
      })
    }
  },[country])
  
  if (weather.main !== undefined) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital ? country.capital[0] : ''}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <Languages languages={country.languages} />
        <img src={country.flags.png} alt={country.flags.png ?? ''} />
        <h2>Weather in {country.capital ? country.capital[0] : country.name.common}</h2>
        <p>temperature {weather.main.temp} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='' title={weather.weather[0].description} />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    );
  }
};

export default Country;