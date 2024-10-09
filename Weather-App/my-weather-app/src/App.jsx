import React, { useState , useEffect } from 'react';
import ReactDOM from 'react-dom/client';


import './App.css';
import axios from 'axios';



function App() {


  const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("London");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKey = "ac85a7373a70c9cb7081dc18145573a8"; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                setWeatherData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchWeather();
    }, [city]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  return (
    <div className="App">

      <div className='container'>

      <div className='left-side'>


        <div>
          <input type = "text" placeholder = "Enter a town or city near you..." onChange={handleCityChange}/>
        </div>

        <div className='current-city'>

          <h1>{city}</h1>
          <button onClick={handleCityChange}>Set as hometown</button>
          <p>current</p>
          <div>
            <span className='celsi'></span> <span className='fahr' hidden>39</span>
            <sup className='celsius'>°C</sup>
            <sup>|</sup> 
            <sup className='fahrenheit'>°F</sup>
          </div>

        </div>


        <div className='future-days day-0'>

            <div>
              <h3 className='cday-0'>Today</h3>
            </div>
          
          <div>
            <img src="images/sun.png" alt="" height="100px"/>
          </div>

          <div>
            <span style={{fontSize :'30px' }}>39°  </span>
            <span style={{color: 'red', fontSize: '12px'  }}>9°</span>
          </div>

        </div>

      </div>

      <div className='right-side'>
        <div className='more-info'>

          <div>
            <h2>Today's Weather Condition</h2>
          </div>

          <p> <span>icon</span> Humidity   <span>70%</span></p>
          


        </div>

      </div>




      </div>


    </div>


    
  );
}

export default App;
