// import React from 'react'
import { Link } from 'react-router-dom'
import './Day2.scss'
import { useState } from 'react'
import WeatherBox from '../../components/WeatherBox/WeatherBox'
import {day2imgs} from '../../assets.js'
import { getWeatherData } from '../../services/WeatherService.js'


const Day2 = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);//store weather data 
    const [error,setError] = useState(null);

    const handleSearch = async(e) => {
        e.preventDefault();
        if (city.trim() === "") {
            alert("Enter city name");
            return;
        }; 
        try {
            const data = await getWeatherData(city);
            if (data) {
                console.log("data:", data)
                setWeatherData({
                    humidity:data.main.humidity,
                    windSpeed:data.wind.speed,
                    feelslike:data.main.feels_like,
                    location:data.name,
                    country:data.sys.country,
                    weather:data.weather[0].main,
                    temp:data.main.temp,

                });  
                setError(null);  
            } else {
                setError("Could not fetch weather data for this city.");  
            }
        } catch (error) {
            setError("An error occurred while fetching the data.");
        }
    }
    const handleCity = (e) => {
        e.preventDefault();
        setCity(e.target.value);
    }

  return (
    <>
        <div className='weather'>
            <div className='todo__box1'>
                <p className='todo__title'><Link to="/">Back</Link></p>
                <div className='todo__title'>Weather Application</div>
            </div>
            <div className='weather__container'>
            <div className='weather__search-box'>
                <label className='weather__label' htmlFor="weather">Search for city</label>
                <input className='weather__input' type="text" name="city" id="weather" value={city} onChange={handleCity} placeholder='Enter city'/>
                 <img className='weather__searchicon' type="submit" onClick={handleSearch} src={day2imgs.search} alt="search-icon" />
            </div>
            <div className='time-box'>
                <p>Sat Feb 22, 2025</p>
                <p>3.50 pm</p>
            </div>
            {weatherData ? (
                <>
                    <img src={day2imgs.snow} alt="weather-icon" />
                        <p>{weatherData.location}, {weatherData.country}</p>
                    <div className='time-box'>
                        <p>{weatherData.weather}</p>
                        <p>{Math.round(weatherData.temp)}°F</p>
                    <div>
                        <p><img className='weather__icons' src={day2imgs.humidity} alt="humidity-icon" />  Humidity: {weatherData.humidity}%</p>
                        <p><img className='weather__icons' src={day2imgs.wind} alt="wind-icon" />Wind speed: {weatherData.windSpeed} m/s</p>
                        <p>Feels like: {Math.round(weatherData.feelslike)}°F</p>
                    </div>
                    </div>
                </>
            ):(
                <>
                <p>{error || "Enter a city to get weather data"}</p>
                </>
            )}
            </div>
        </div>
    </>
  )
}

export default Day2