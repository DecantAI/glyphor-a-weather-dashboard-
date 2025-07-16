I'll share a simplified version of a weather dashboard. In a real-world application, it would likely be broken into multiple components for simplicity and reusability. This version uses the OpenWeatherMap API for weather data. 

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://api.openweathermap.org/data/2.5/forecast?id=CITY_ID&appid=YOUR_API_KEY')
      .then((response) => {
        setWeatherData(response.data.list.map(item => ({
          date: item.dt_txt,
          temperature: item.main.temp - 273.15, // Convert from Kelvin to Celsius
        })));
        setLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const data = {
    labels: weatherData.map(item => item.date),
    datasets: [
      {
        label: 'Temperature',
        data: weatherData.map(item => item.temperature),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
    },
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <Line data={data} options={options} />
    </div>
  );
};

export default App;
```

Make sure to replace `"CITY_ID"` and `"YOUR_API_KEY"` with appropriate values. Also, for styling, you can create a file named `App.css` in the same directory and add your styles there.

This code fetches data from the OpenWeatherMap API, processes it, and stores it in the `weatherData` state. It displays a loading message while the data is being fetched, and an error message if the fetch fails. The temperature data is then displayed in a line chart using the `react-chartjs-2` library.