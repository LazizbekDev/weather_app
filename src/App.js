import React, { useState } from 'react';
import './index.css';

const api = {
  key: "8bb9a8d24c6c96d349355d648713076a",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    if(event.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
          console.log(result)
        })
    }
  }
  
  const dateBuilder = (d) => {
    let months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyyun', 'Iyyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
    let days = ['Yaksanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'JUMA', 'Shanba'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date}-${month}, ${year}-yil`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App light' : 'App') : 'App'}>
      <main>
        <div className="searchBox">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
        
      </main>
    </div>
  );
}

export default App;
