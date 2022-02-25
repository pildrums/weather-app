import React, { useState } from 'react';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === "Enter") {
      fetch(`${process.env.REACT_APP_BASE}weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })
    }
  };

  const dateBuilder = d => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  
  return (
    <div>
      
    </div>
  );
};

export default App;