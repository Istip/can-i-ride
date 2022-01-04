import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [value, setValue] = useState('Odorheiu Secuiesc');
  const [city, setCity] = useState('Odorheiu Secuiesc');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({});

  const apiKey = process.env.REACT_APP_API_KEY;

  const handleSelectCity = (e) => {
    e.preventDefault();
    setCity(value);
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
      // REMOVE this line soon!
      .then(() => console.log(weather))
      .catch((error) => {
        console.log('API error:', error);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [city, apiKey]);

  if (loading) {
    return 'Loading...';
  }

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h1>Can I ride my bike?</h1>
            <br />
            <h3>Just a weather forecast, but this time for bikers!</h3>
            <br />

            <form onSubmit={handleSelectCity}>
              <input
                style={{ padding: '16px' }}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button type="submit">Check out!</button>
            </form>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
