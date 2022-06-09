import React, { useState } from 'react';
import styled from 'styled-components';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  // 검색 시 API 연동
  const search = e => {
    if (e.key === "Enter") {
      fetch(`${process.env.REACT_APP_BASE}weather?q=${query}&units=metric&appid=${process.env.REACT_APP_API_KEY}&lang=kr`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })
    }
  };

  // 날짜 생성 함수
  const dateBuilder = d => {
    let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    let days = ["일", "월", "화", "수", "목", "금", "토"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${year}년 ${month}월 ${date}일 ${day}요일`
  };

  // 추후 컴포넌트 단위로 리팩토링 예정
  return (
    <WeatherWrapper>
      <WeatherContainer className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
        <main>
          <SearchBox>
            <SearchInput
              type="text" 
              placeholder='지역'
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </SearchBox>
          {(typeof weather.main != "undefined") ? (
            <div>
              <LocationBox>
                <Location>{weather.name}, {weather.sys.country}</Location>
                <DateBox>{dateBuilder(new Date())}</DateBox>
              </LocationBox>
              <WeatherBox>
                <Temp>
                  {Math.round(weather.main.temp)}°c
                </Temp>
                <Weather>
                  {weather.weather[0].description}
                </Weather>
              </WeatherBox>
            </div>
          ) : ('')}
        </main>
      </WeatherContainer>
    </WeatherWrapper>
  );
};

const WeatherWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeatherContainer = styled.div`
  width: 500px;
  main {
    min-height: 100vh;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.75));
    padding: 25px;
  }
`;

const SearchBox = styled.div`
  width: 100%;
  margin: 0 0 75px;
`;

const SearchInput = styled.input`
  display: block;
  width: 100%;
  padding: 15px;
  appearance: none;
  background: none;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 0px 16px 16px;
  margin-top: -25px;
  box-shadow: 0px 5px rgba(0, 0, 0, 0.2);
  color: #313131;
  font-size: 20px;
  transition: 0.4s ease;
  &:focus {
    background-color: rgba(255, 255, 255, 0.75);
  }
`;

const LocationBox = styled.div``;

const Location = styled.div`
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 3px 3px rgba(50, 50, 70, 0.5);
`;

const DateBox = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
  text-shadow: 2px 2px rgba(50, 50, 70, 0.5);
`;

const WeatherBox = styled.div`
  text-align: center;
`;

const Temp = styled.div`
  position: relative;
  display: inline-block;
  margin: 30px auto;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 15px 25px;
  color: #FFF;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(50, 50, 70, 0.5);
  text-align: center;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.2);
`;

const Weather = styled.div`
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  text-shadow: 3px 3px rgba(50, 50, 70, 0.5);
`;

export default App;