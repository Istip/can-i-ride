import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [city, setCity] = useState('Odorheiu Secuiesc');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState('');

  const apiKey = process.env.REACT_APP_API_KEY;

  const handleSelectCity = (e) => {
    e.preventDefault();
    setCity(value);
    setValue('');
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
      .then((res) => {
        setWeather(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('API error:', error);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [city, apiKey]);

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h1>Can I ride my bike?</h1>
            <h3>Weather forecast for bikers!</h3>
            <br />

            <form onSubmit={handleSelectCity}>
              <input
                style={{ padding: '16px' }}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter city name..."
                required
              />
              <button type="submit" style={{ padding: '16px 32px' }}>
                Check out!
              </button>
            </form>
          </>
        )}

        <br />

        {typeof weather === 'object' && (
          <div>
            <h2>
              {weather.name} <small>({weather.sys.country})</small>
            </h2>
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt=""
            />
            <br />
            <p>{Math.floor(weather.main.temp - 273.15)} °C</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
